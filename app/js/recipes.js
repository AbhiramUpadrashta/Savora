/*
 * Savora — the recipe treasury.
 * 1000+ recipes are assembled from real dish families (curries, biryanis, dosas, cakes, drinks…):
 * every recipe gets its own ingredients, steps, calories, flavour and the cooking actions the chef acts out.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  var R = [], seen = {};

  function slug(s) { return String(s).toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function uniq(a) { var o = [], m = {}; a.forEach(function (x) { if (x && !m[x]) { m[x] = 1; o.push(x); } }); return o; }
  function S(act, text, min) { return { act: act, text: text, min: min || 1 }; }
  function I(q, item) { return { q: q, item: item }; }

  // non-vegan → vegan swaps (used for vegan versions of dishes)
  var VEGAN_SWAP = [[/\bghee\b/gi, 'oil'], [/\bbutter\b/gi, 'vegan butter'], [/\bfresh cream\b/gi, '§CC§'], [/\bcream\b/gi, 'coconut cream'], [/§CC§/g, 'cashew cream'],
    [/\bcurd\b/gi, 'coconut yogurt'], [/\bmilk\b/gi, 'oat milk'], [/\bhoney\b/gi, 'maple syrup'], [/\bcheese\b/gi, 'vegan cheese'], [/\bkhoya\b/gi, 'cashew paste']];
  function veganize(s) { VEGAN_SWAP.forEach(function (p) { s = s.replace(p[0], p[1]); }); return s.replace(/vegan vegan/g, 'vegan').replace(/coconut coconut/g, 'coconut'); }

  function add(r) {
    var id = slug(r.name);
    if (seen[id]) return null;
    seen[id] = 1;
    r.id = id;
    r.cats = uniq(r.cats || []);
    r.serves = r.serves || 2;
    r.steps = r.steps.filter(Boolean);
    r.ing = r.ing.filter(Boolean);
    r.time = r.time || r.steps.reduce(function (a, s) { return a + (s.min || 1); }, 0) + 5;
    r.level = r.level || (r.time <= 20 ? 'Easy' : r.time <= 50 ? 'Medium' : 'Chef level');
    if (r.time <= 20 && r.ing.length <= 9 && r.cats.indexOf('drinks') < 0 && r.cats.indexOf('icecream') < 0) r.cats.push('bachelor');
    if (r.diet === 'vegan') r.cats.push('vegan', 'veg');
    else if (r.diet === 'veg') r.cats.push('veg');
    else if (r.diet === 'egg') r.cats.push('egg', 'nonveg');
    else r.cats.push('nonveg');
    r.cats = uniq(r.cats);
    r.kcal = Math.round(r.kcal || 250);
    r.desc = r.desc || '';
    R.push(r);
    return r;
  }

  // ------------------------------------------------------------------ main ingredients
  var P = {
    paneer: { n: 'Paneer', diet: 'veg', q: '250 g', item: 'paneer, cubed', kcal: 260, color: '#f7ecd0', piece: 'cube',
      prep: S('chop', 'Cut the paneer into bite-size cubes and soak them in warm salted water for 10 minutes so they stay soft.', 3),
      cook: 'Add the paneer cubes and simmer gently for 3–4 minutes — paneer turns rubbery if overcooked.', min: 4 },
    chicken: { n: 'Chicken', diet: 'nonveg', q: '500 g', item: 'chicken, curry cut', kcal: 240, color: '#c9803f', piece: 'chunk',
      prep: S('marinate', 'Marinate the chicken with 2 tbsp curd, ½ tsp turmeric, 1 tsp chilli powder and salt. Rest for 30 minutes.', 30),
      cook: 'Add the chicken, cover and cook on medium heat for 15–18 minutes until tender and cooked through.', min: 18 },
    mutton: { n: 'Mutton', diet: 'nonveg', q: '500 g', item: 'mutton, bone-in pieces', kcal: 310, color: '#8a4a2b', piece: 'chunk',
      prep: S('pressure', 'Pressure-cook the mutton with turmeric, salt and 1 cup water for 5–6 whistles until soft. Keep the stock.', 30),
      cook: 'Add the cooked mutton with its stock and simmer 10 minutes so it soaks up the masala.', min: 10 },
    fish: { n: 'Fish', diet: 'nonveg', q: '500 g', item: 'fish steaks (seer / pomfret / rohu)', kcal: 210, color: '#e0a15a', piece: 'fillet',
      prep: S('marinate', 'Rub the fish with turmeric, chilli powder, salt and lemon juice. Rest for 15 minutes.', 15),
      cook: 'Slide the fish pieces into the gravy, spoon sauce over them and simmer 6–8 minutes. Don\'t stir too much — fish breaks easily.', min: 8 },
    prawn: { n: 'Prawn', diet: 'nonveg', q: '400 g', item: 'prawns, cleaned & deveined', kcal: 190, color: '#f08a5d', piece: 'prawn',
      prep: S('marinate', 'Toss the prawns with turmeric, chilli powder and salt. Rest for 10 minutes.', 10),
      cook: 'Add the prawns and cook 5–6 minutes until they curl and turn pink.', min: 6 },
    egg: { n: 'Egg', diet: 'egg', q: '6', item: 'eggs, hard-boiled & peeled', kcal: 180, color: '#fff6d8', piece: 'egg',
      prep: S('boil', 'Hard-boil the eggs for 10 minutes, cool, peel and make shallow slits so the masala seeps in.', 12),
      cook: 'Add the eggs and simmer 5 minutes, spooning the masala over them.', min: 5 },
    mushroom: { n: 'Mushroom', diet: 'veg', q: '250 g', item: 'button mushrooms, halved', kcal: 90, color: '#b99a78', piece: 'mushroom',
      prep: S('chop', 'Wipe the mushrooms clean and cut them in halves or quarters.', 3),
      cook: 'Add the mushrooms and cook 6–7 minutes until they release water and soften.', min: 7 },
    veg: { n: 'Mixed Veg', diet: 'veg', q: '3 cups', item: 'mixed vegetables (carrot, beans, peas, potato, cauliflower)', kcal: 110, color: '#8bbf5a', piece: 'veg',
      prep: S('chop', 'Chop the carrot, beans, potato and cauliflower into small even pieces. Keep the peas ready.', 6),
      cook: 'Add the vegetables with ½ cup water, cover and cook 10–12 minutes until just tender.', min: 12 },
    aloo: { n: 'Aloo', diet: 'veg', q: '4', item: 'potatoes, boiled & cubed', kcal: 150, color: '#e8c36a', piece: 'cube',
      prep: S('boil', 'Boil the potatoes until just done, peel and cut into cubes.', 15),
      cook: 'Add the potatoes and simmer 5 minutes so they absorb the gravy.', min: 5 },
    chana: { n: 'Chana', diet: 'veg', q: '2 cups', item: 'chickpeas, soaked overnight & boiled', kcal: 210, color: '#c8964f', piece: 'bean',
      prep: S('pressure', 'Pressure-cook the soaked chickpeas with salt for 5–6 whistles until soft.', 25),
      cook: 'Add the chickpeas with a little cooking water and simmer 10 minutes; mash a few to thicken.', min: 10 },
    tofu: { n: 'Tofu', diet: 'vegan', q: '250 g', item: 'firm tofu, pressed & cubed', kcal: 150, color: '#f3ead6', piece: 'cube',
      prep: S('chop', 'Press the tofu for 10 minutes to remove water, then cut into cubes and pan-sear until golden.', 12),
      cook: 'Add the seared tofu and simmer 4 minutes so it soaks up the flavours.', min: 4 },
    soya: { n: 'Soya Chunks', diet: 'vegan', q: '1½ cups', item: 'soya chunks', kcal: 170, color: '#a8754a', piece: 'chunk',
      prep: S('boil', 'Boil the soya chunks in salted water for 5 minutes, rinse in cold water and squeeze dry.', 8),
      cook: 'Add the soya chunks and cook 6 minutes so they absorb the masala.', min: 6 },
    gobi: { n: 'Gobi', diet: 'veg', q: '1 medium', item: 'cauliflower, cut into florets', kcal: 90, color: '#f1e6c8', piece: 'floret',
      prep: S('boil', 'Blanch the cauliflower florets in hot salted water with a pinch of turmeric for 3 minutes; drain.', 5),
      cook: 'Add the florets and cook covered 8 minutes until tender.', min: 8 },
    matar: { n: 'Matar', diet: 'veg', q: '2 cups', item: 'green peas', kcal: 120, color: '#7cbf4a', piece: 'pea',
      prep: null, cook: 'Add the peas and cook 6–7 minutes until soft.', min: 7 },
    rajma: { n: 'Rajma', diet: 'veg', q: '1½ cups', item: 'red kidney beans, soaked overnight', kcal: 230, color: '#8e2f2a', piece: 'bean',
      prep: S('pressure', 'Pressure-cook the soaked rajma with salt for 7–8 whistles until completely soft.', 35),
      cook: 'Add the rajma with its water and simmer 15 minutes, mashing a few beans for a creamy gravy.', min: 15 },
    kofta: { n: 'Malai Kofta', diet: 'veg', q: '12', item: 'paneer-potato koftas (250 g paneer, 2 boiled potatoes, 2 tbsp cornflour)', kcal: 320, color: '#e7c07a', piece: 'ball',
      prep: S('fry', 'Mash paneer and potatoes with cornflour and salt, shape into balls and deep-fry until golden.', 15),
      cook: 'Place the koftas in the serving dish and pour the hot gravy over them just before serving.', min: 2 },
    babycorn: { n: 'Baby Corn', diet: 'veg', q: '200 g', item: 'baby corn, sliced', kcal: 90, color: '#f0d36a', piece: 'corn',
      prep: S('boil', 'Blanch the baby corn for 3 minutes and drain.', 4), cook: 'Add the baby corn and cook 5 minutes.', min: 5 },
    crab: { n: 'Crab', diet: 'nonveg', q: '4', item: 'crabs, cleaned & halved', kcal: 200, color: '#e2572f', piece: 'crab',
      prep: S('chop', 'Clean the crabs thoroughly, remove the gills and crack the claws lightly.', 10),
      cook: 'Add the crabs, coat well with masala, cover and cook 12 minutes.', min: 12 }
  };

  // ------------------------------------------------------------------ curry styles (name, region, spices, method)
  var BASE_ONION = [S('fry', 'Heat oil in a heavy pan and splutter the whole spices.', 1), S('saute', 'Add the onions and sauté 8 minutes until deep golden.', 8), S('add', 'Add ginger-garlic paste and cook 1 minute till the raw smell goes.', 1)];
  var ST = [
    { k: 'makhani', region: 'north', name: function (p) { return p.k === 'paneer' ? 'Paneer Butter Masala' : p.k === 'chicken' ? 'Butter Chicken' : p.n + ' Makhani'; },
      flav: 'Creamy · Mildly sweet', kcal: 190, color: '#e0662f', compat: 'paneer chicken mushroom veg tofu egg soya kofta',
      ing: [I('3 tbsp', 'butter'), I('1', 'onion, chopped'), I('4', 'ripe tomatoes, chopped'), I('12', 'cashews'), I('1 tbsp', 'ginger-garlic paste'), I('1½ tsp', 'Kashmiri chilli powder'), I('1 tsp', 'garam masala'), I('1 tsp', 'kasuri methi'), I('3 tbsp', 'fresh cream'), I('1 tsp', 'sugar')],
      steps: [S('saute', 'Melt 1 tbsp butter and sauté the onion, tomatoes and cashews for 7 minutes until soft.', 7), S('blend', 'Cool slightly and blend into a smooth, silky purée.', 3), S('fry', 'Melt the remaining butter, add ginger-garlic paste and Kashmiri chilli; cook 1 minute.', 1), S('simmer', 'Pour in the purée with ½ cup water, salt and sugar. Simmer 8 minutes until butter floats on top.', 8)],
      finish: S('garnish', 'Stir in the cream, crushed kasuri methi and garam masala. Serve hot with butter naan or jeera rice.', 2) },
    { k: 'kadai', region: 'north', name: function (p) { return 'Kadai ' + p.n; }, flav: 'Spicy · Smoky', kcal: 150, color: '#b8452a', compat: 'paneer chicken mushroom veg tofu egg soya babycorn mutton prawn',
      ing: [I('3 tbsp', 'oil'), I('2 tbsp', 'coriander seeds'), I('4', 'dry red chillies'), I('1', 'capsicum, cut in squares'), I('2', 'onions (1 chopped, 1 in petals)'), I('3', 'tomatoes, puréed'), I('1 tbsp', 'ginger-garlic paste'), I('½ tsp', 'turmeric'), I('1 tsp', 'garam masala'), I('2 tbsp', 'coriander leaves')],
      steps: [S('fry', 'Dry-roast the coriander seeds and red chillies for 2 minutes and pound them coarsely — this is the kadai masala.', 3), S('saute', 'In hot oil sauté the chopped onion 6 minutes, add ginger-garlic paste and turmeric.', 7), S('add', 'Add the tomato purée and half the kadai masala; cook until oil separates, about 6 minutes.', 6), S('fry', 'Toss in the capsicum and onion petals for 2 minutes — keep them crunchy.', 2)],
      finish: S('garnish', 'Sprinkle the remaining kadai masala, garam masala and coriander leaves. Serve with roti.', 1) },
    { k: 'tikka', region: 'north', name: function (p) { return p.n + ' Tikka Masala'; }, flav: 'Smoky · Rich', kcal: 200, color: '#d0512b', compat: 'paneer chicken mushroom tofu soya fish prawn',
      ing: [I('½ cup', 'thick curd'), I('2 tsp', 'tandoori masala'), I('2 tbsp', 'butter'), I('2', 'onions, chopped'), I('3', 'tomatoes, puréed'), I('1 tbsp', 'ginger-garlic paste'), I('1 tsp', 'Kashmiri chilli powder'), I('2 tbsp', 'fresh cream'), I('1 tsp', 'kasuri methi')],
      steps: [S('marinate', 'Coat the pieces in curd, tandoori masala and salt; marinate for 20 minutes.', 20), S('grill', 'Grill or pan-roast the pieces until charred at the edges.', 8), S('saute', 'Melt butter, sauté onions 7 minutes, add ginger-garlic paste and chilli powder.', 8), S('simmer', 'Add the tomato purée and simmer 8 minutes until thick and glossy.', 8)],
      finish: S('garnish', 'Add the grilled tikka, cream and kasuri methi; simmer 2 minutes and serve with naan.', 2) },
    { k: 'korma', region: 'north', name: function (p) { return p.n + ' Korma'; }, flav: 'Mild · Nutty', kcal: 220, color: '#e9c98e', compat: 'paneer chicken mutton veg egg tofu mushroom kofta',
      ing: [I('3 tbsp', 'ghee'), I('2', 'onions, thinly sliced'), I('15', 'cashews'), I('2 tbsp', 'desiccated coconut'), I('½ cup', 'curd, whisked'), I('1 tbsp', 'ginger-garlic paste'), I('4', 'green cardamoms'), I('1', 'bay leaf'), I('½ tsp', 'white pepper'), I('pinch', 'saffron')],
      steps: [S('fry', 'Fry the sliced onions in ghee until light golden; lift out half for the paste.', 8), S('blend', 'Grind the fried onion, cashews and coconut with a little water into a smooth paste.', 3), S('saute', 'Add cardamom, bay leaf and ginger-garlic paste to the ghee; cook 1 minute.', 1), S('simmer', 'Stir in the paste and whisked curd on low heat; simmer 8 minutes without boiling hard.', 8)],
      finish: S('garnish', 'Finish with saffron milk and white pepper. Serve with sheermal or ghee rice.', 1) },
    { k: 'dopyaza', region: 'north', name: function (p) { return p.n + ' Do Pyaza'; }, flav: 'Savoury · Sweet onion', kcal: 170, color: '#b8702f', compat: 'paneer chicken mutton mushroom egg tofu soya',
      ing: [I('3 tbsp', 'oil'), I('4', 'onions (2 chopped, 2 in petals)'), I('2', 'tomatoes, chopped'), I('1 tbsp', 'ginger-garlic paste'), I('1 tsp', 'coriander powder'), I('1 tsp', 'chilli powder'), I('1 tsp', 'garam masala'), I('1 tsp', 'cumin seeds')],
      steps: [S('fry', 'Sear the onion petals on high heat 2 minutes; keep aside.', 2), S('saute', 'Crackle cumin, then sauté the chopped onions 8 minutes until brown.', 8), S('add', 'Add ginger-garlic paste, tomatoes and the powdered spices; cook till mushy.', 6)],
      finish: S('garnish', 'Fold in the seared onion petals and garam masala. Serve hot with phulka.', 2) },
    { k: 'handi', region: 'north', name: function (p) { return 'Handi ' + p.n; }, flav: 'Rustic · Spicy', kcal: 190, color: '#a8452a', compat: 'paneer chicken mutton veg mushroom',
      ing: [I('3 tbsp', 'ghee'), I('2', 'onions, chopped'), I('3', 'tomatoes, chopped'), I('½ cup', 'curd'), I('1 tbsp', 'ginger-garlic paste'), I('2', 'green chillies'), I('1 tsp', 'chilli powder'), I('1 tsp', 'coriander powder'), I('1 tsp', 'garam masala'), I('2 tbsp', 'cream')],
      steps: [S('saute', 'In a clay or heavy handi, sauté onions in ghee 8 minutes until golden.', 8), S('add', 'Add ginger-garlic paste, chillies, tomatoes and spices; cook until oil separates.', 7), S('stir', 'Lower the heat and stir in the curd a spoon at a time so it doesn\'t split.', 3)],
      finish: S('garnish', 'Seal with the lid for 5 minutes on dum, then swirl in cream. Serve in the handi itself.', 5) },
    { k: 'lababdar', region: 'north', name: function (p) { return p.n + ' Lababdar'; }, flav: 'Tangy · Creamy', kcal: 210, color: '#d2582d', compat: 'paneer chicken mushroom tofu',
      ing: [I('2 tbsp', 'butter'), I('2', 'onions, finely chopped'), I('4', 'tomatoes, puréed'), I('10', 'cashews, ground'), I('1 tbsp', 'ginger-garlic paste'), I('1 tsp', 'Kashmiri chilli powder'), I('50 g', 'grated paneer or cream'), I('1 tsp', 'kasuri methi')],
      steps: [S('saute', 'Sauté onions in butter 8 minutes until golden.', 8), S('add', 'Add ginger-garlic paste, tomato purée and chilli powder; cook 8 minutes.', 8), S('stir', 'Stir in the cashew paste and ½ cup water; simmer 4 minutes.', 4)],
      finish: S('garnish', 'Finish with grated paneer (or cream) and kasuri methi. Serve with laccha paratha.', 2) },
    { k: 'saag', region: 'north', name: function (p) { return p.k === 'paneer' ? 'Palak Paneer' : 'Palak ' + p.n; }, flav: 'Earthy · Mild', kcal: 150, color: '#3f7d3a', compat: 'paneer chicken mutton tofu mushroom aloo chana egg',
      ing: [I('2 bunches', 'spinach (palak)'), I('2 tbsp', 'ghee'), I('1', 'onion, chopped'), I('1', 'tomato, chopped'), I('4 cloves', 'garlic'), I('1 inch', 'ginger'), I('2', 'green chillies'), I('1 tsp', 'cumin seeds'), I('2 tbsp', 'cream')],
      steps: [S('boil', 'Blanch the spinach 2 minutes, then plunge into ice water to keep it bright green.', 3), S('blend', 'Blend the spinach with ginger, garlic and green chillies into a smooth purée.', 2), S('saute', 'Crackle cumin in ghee, sauté onion and tomato 6 minutes.', 6), S('simmer', 'Add the spinach purée and salt; simmer 4 minutes — don\'t overcook or it turns dull.', 4)],
      finish: S('garnish', 'Swirl in cream and serve with hot phulkas.', 1) },
    { k: 'roganjosh', region: 'north', name: function (p) { return p.n + ' Rogan Josh'; }, flav: 'Aromatic · Fiery red', kcal: 230, color: '#9e2b25', compat: 'mutton chicken',
      ing: [I('4 tbsp', 'mustard oil or ghee'), I('1 cup', 'curd, whisked'), I('2 tsp', 'Kashmiri chilli powder'), I('1 tsp', 'dry ginger powder (saunth)'), I('2 tsp', 'fennel powder'), I('4', 'cloves'), I('4', 'green cardamoms'), I('1', 'black cardamom'), I('pinch', 'asafoetida')],
      steps: [S('fry', 'Heat the oil till smoking, cool slightly, then add whole spices and asafoetida.', 2), S('stir', 'Mix Kashmiri chilli with curd and stir into the pan on low heat.', 3), S('add', 'Add fennel and dry ginger powders with a cup of water.', 2)],
      finish: S('simmer', 'Cover and simmer until the oil rises and the gravy is deep red. Serve with steamed rice.', 10) },
    { k: 'bhuna', region: 'north', name: function (p) { return 'Bhuna ' + p.n; }, flav: 'Dry · Intense', kcal: 200, color: '#7a3a22', compat: 'chicken mutton paneer egg prawn soya mushroom',
      ing: [I('4 tbsp', 'oil'), I('3', 'onions, chopped'), I('2', 'tomatoes, chopped'), I('1½ tbsp', 'ginger-garlic paste'), I('1½ tsp', 'chilli powder'), I('2 tsp', 'coriander powder'), I('1 tsp', 'cumin powder'), I('1 tsp', 'garam masala'), I('1 tbsp', 'lemon juice')],
      steps: [S('saute', 'Fry onions in oil 10 minutes until dark brown — this "bhunao" is the soul of the dish.', 10), S('add', 'Add ginger-garlic paste, tomatoes and all powders; roast on high, splashing water whenever it sticks.', 8)],
      finish: S('garnish', 'Roast till the masala coats everything thickly, finish with lemon juice and garam masala.', 4) },
    { k: 'achari', region: 'north', name: function (p) { return 'Achari ' + p.n; }, flav: 'Tangy · Pickled spice', kcal: 180, color: '#b85a22', compat: 'paneer chicken mutton aloo mushroom',
      ing: [I('3 tbsp', 'mustard oil'), I('1 tsp', 'fennel seeds'), I('½ tsp', 'nigella seeds'), I('½ tsp', 'fenugreek seeds'), I('1 tsp', 'mustard seeds'), I('2', 'onions, chopped'), I('2', 'tomatoes, chopped'), I('½ cup', 'curd'), I('1 tsp', 'amchur')],
      steps: [S('fry', 'Heat mustard oil till smoking; crackle fennel, nigella, fenugreek and mustard seeds.', 2), S('saute', 'Sauté onions 7 minutes, add tomatoes and cook soft.', 8), S('stir', 'Lower heat and stir in the curd and amchur.', 3)],
      finish: S('garnish', 'Simmer till glossy and serve with parathas.', 3) },
    { k: 'methimalai', region: 'north', name: function (p) { return 'Methi Malai ' + p.n; }, flav: 'Creamy · Herby', kcal: 230, color: '#cdd89b', compat: 'paneer chicken mushroom matar',
      ing: [I('2 tbsp', 'butter'), I('1', 'onion, chopped'), I('1 cup', 'fresh methi leaves'), I('12', 'cashews, soaked'), I('½ cup', 'milk'), I('¼ cup', 'fresh cream'), I('2', 'green chillies'), I('½ tsp', 'garam masala')],
      steps: [S('blend', 'Blend the onion, cashews and green chillies into a smooth paste.', 3), S('saute', 'Cook the paste in butter 5 minutes; add the methi leaves and sauté 3 minutes.', 8), S('stir', 'Pour in the milk and simmer 4 minutes.', 4)],
      finish: S('garnish', 'Finish with cream and garam masala. Serve with naan.', 2) },
    { k: 'jalfrezi', region: 'north', name: function (p) { return p.n + ' Jalfrezi'; }, flav: 'Tangy · Peppery', kcal: 150, color: '#c9502d', compat: 'paneer chicken veg prawn mushroom tofu',
      ing: [I('3 tbsp', 'oil'), I('1', 'capsicum, julienned'), I('1', 'onion, sliced'), I('1', 'carrot, julienned'), I('2', 'tomatoes, sliced'), I('2 tbsp', 'tomato ketchup'), I('1 tsp', 'vinegar'), I('1 tsp', 'chilli powder'), I('½ tsp', 'cumin seeds')],
      steps: [S('fry', 'Stir-fry the onion, capsicum and carrot on high heat for 3 minutes.', 3), S('add', 'Add tomatoes, chilli powder, ketchup and vinegar; toss 2 minutes.', 2)],
      finish: S('garnish', 'Toss everything together until coated and glossy. Serve immediately.', 2) },
    { k: 'kolhapuri', region: 'north', name: function (p) { return p.n + ' Kolhapuri'; }, flav: 'Very spicy · Bold', kcal: 190, color: '#8f2618', compat: 'chicken mutton paneer veg egg',
      ing: [I('3 tbsp', 'oil'), I('¼ cup', 'dry coconut, grated'), I('6', 'dry red chillies'), I('1 tbsp', 'sesame seeds'), I('1 tbsp', 'coriander seeds'), I('2', 'onions, sliced'), I('2', 'tomatoes, chopped'), I('1 tbsp', 'ginger-garlic paste')],
      steps: [S('fry', 'Roast the coconut, red chillies, sesame and coriander seeds with one sliced onion till dark.', 6), S('blend', 'Grind into a thick paste with a little water.', 3), S('saute', 'Sauté the remaining onion, ginger-garlic paste and tomatoes in oil 6 minutes.', 6), S('simmer', 'Add the ground masala and simmer 6 minutes.', 6)],
      finish: S('garnish', 'Garnish with coriander and serve with bhakri or rice.', 1) },
    // ---- South
    { k: 'chettinad', region: 'south', name: function (p) { return p.n + ' Chettinad'; }, flav: 'Peppery · Fiery', kcal: 190, color: '#7b3419', compat: 'chicken mutton egg mushroom paneer veg prawn fish',
      ing: [I('3 tbsp', 'gingelly oil'), I('1 tbsp', 'black peppercorns'), I('1 tbsp', 'fennel seeds'), I('2 tbsp', 'coriander seeds'), I('6', 'dry red chillies'), I('¼ cup', 'grated coconut'), I('1', 'star anise'), I('2', 'onions, chopped'), I('2', 'tomatoes, chopped'), I('1 sprig', 'curry leaves')],
      steps: [S('fry', 'Dry-roast pepper, fennel, coriander, red chillies, star anise and coconut until fragrant.', 5), S('blend', 'Grind into the famous Chettinad masala paste.', 3), S('saute', 'Sauté onions and curry leaves in gingelly oil 7 minutes; add tomatoes.', 9), S('add', 'Stir in the Chettinad paste and cook until oil separates.', 5)],
      finish: S('garnish', 'Top with curry leaves and a crack of pepper. Serve with parotta or steamed rice.', 1) },
    { k: 'kurma', region: 'south', name: function (p) { return p.n + ' Kurma'; }, flav: 'Coconutty · Mild', kcal: 200, color: '#e9d7a2', compat: 'veg chicken egg mutton paneer mushroom soya tofu chana',
      ing: [I('3 tbsp', 'oil'), I('½ cup', 'fresh coconut'), I('8', 'cashews'), I('1 tsp', 'fennel seeds'), I('2', 'green chillies'), I('1', 'onion, sliced'), I('1', 'tomato, chopped'), I('2', 'cloves'), I('1 inch', 'cinnamon'), I('2 tbsp', 'mint leaves')],
      steps: [S('blend', 'Grind coconut, cashews, fennel and green chillies into a fine paste.', 3), S('fry', 'Fry cloves and cinnamon in oil, then sauté onion 6 minutes.', 6), S('add', 'Add tomato and mint; cook 3 minutes, then the coconut paste with 1 cup water.', 5)],
      finish: S('simmer', 'Simmer until creamy. Perfect with parotta, chapati or idiyappam.', 5) },
    { k: 'pepperfry', region: 'south', name: function (p) { return p.n + ' Pepper Fry'; }, flav: 'Peppery · Dry', kcal: 180, color: '#5a2f1c', compat: 'chicken mutton prawn egg mushroom paneer gobi soya babycorn',
      ing: [I('3 tbsp', 'coconut oil'), I('1½ tbsp', 'black pepper, crushed'), I('2', 'onions, sliced'), I('1 tbsp', 'ginger-garlic paste'), I('2 sprigs', 'curry leaves'), I('1 tsp', 'fennel seeds'), I('½ tsp', 'turmeric')],
      steps: [S('fry', 'Crackle fennel and curry leaves in coconut oil.', 1), S('saute', 'Sauté onions 8 minutes until caramelised; add ginger-garlic paste.', 9)],
      finish: S('fry', 'Toss on high heat with the crushed pepper until dry and coated. Serve as a starter or side.', 5) },
    { k: 'kerala', region: 'south', name: function (p) { return 'Kerala ' + p.n + ' Curry'; }, flav: 'Coconut · Tangy', kcal: 200, color: '#d9722c', compat: 'fish prawn chicken egg veg crab',
      ing: [I('3 tbsp', 'coconut oil'), I('1 cup', 'thick coconut milk'), I('3', 'kudampuli (Malabar tamarind) or 1 tbsp tamarind'), I('1', 'onion, sliced'), I('1 tbsp', 'ginger, julienned'), I('3', 'green chillies'), I('2 tsp', 'Kashmiri chilli powder'), I('½ tsp', 'fenugreek seeds'), I('2 sprigs', 'curry leaves')],
      steps: [S('fry', 'Crackle fenugreek and curry leaves in coconut oil; add onion, ginger and chillies.', 6), S('add', 'Add chilli powder and turmeric with the kudampuli and 1 cup water; boil 5 minutes.', 5)],
      finish: S('simmer', 'Pour in the coconut milk and heat through without boiling. Rest 30 minutes for best flavour.', 4) },
    { k: 'andhra', region: 'south', name: function (p) { return 'Andhra ' + p.n + ' Curry'; }, flav: 'Very spicy · Tangy', kcal: 190, color: '#a3241a', compat: 'chicken mutton egg fish prawn paneer',
      ing: [I('4 tbsp', 'oil'), I('2', 'onions, chopped'), I('2', 'tomatoes'), I('2 tsp', 'Guntur chilli powder'), I('1 tbsp', 'ginger-garlic paste'), I('1 tbsp', 'tamarind pulp'), I('2 tsp', 'coriander powder'), I('1 tsp', 'garam masala'), I('2 sprigs', 'curry leaves')],
      steps: [S('saute', 'Fry onions with curry leaves until golden; add ginger-garlic paste.', 9), S('add', 'Add tomatoes, Guntur chilli, coriander powder and tamarind; cook down 8 minutes.', 8)],
      finish: S('garnish', 'Finish with garam masala and coriander. Serve with hot rice and ghee.', 2) },
    { k: 'vindaloo', region: 'south', name: function (p) { return p.n + ' Vindaloo'; }, flav: 'Hot · Sour', kcal: 210, color: '#8f2a1b', compat: 'chicken mutton prawn egg veg',
      ing: [I('3 tbsp', 'oil'), I('8', 'Kashmiri chillies, soaked'), I('3 tbsp', 'vinegar'), I('8 cloves', 'garlic'), I('1 inch', 'ginger'), I('1 tsp', 'cumin seeds'), I('6', 'peppercorns'), I('4', 'cloves'), I('2', 'onions, sliced'), I('1 tsp', 'sugar')],
      steps: [S('blend', 'Grind the soaked chillies, garlic, ginger, cumin, pepper and cloves with vinegar.', 3), S('saute', 'Sauté onions in oil until brown, then fry the paste 5 minutes.', 13)],
      finish: S('simmer', 'Add sugar and a little water; simmer until the oil floats. Tastes even better the next day.', 6) },
    { k: 'gheeroast', region: 'south', name: function (p) { return p.n + ' Ghee Roast'; }, flav: 'Buttery · Fiery', kcal: 260, color: '#c43a1c', compat: 'chicken prawn paneer mushroom egg fish',
      ing: [I('4 tbsp', 'ghee'), I('8', 'Byadgi chillies'), I('1 tbsp', 'coriander seeds'), I('1 tsp', 'cumin'), I('½ tsp', 'fenugreek'), I('8 cloves', 'garlic'), I('1 tbsp', 'tamarind'), I('1 tsp', 'jaggery'), I('2 sprigs', 'curry leaves')],
      steps: [S('fry', 'Roast the chillies and whole spices in a little ghee; grind with garlic and tamarind.', 6), S('fry', 'Fry the paste in the rest of the ghee on low heat for 8 minutes until deep red.', 8)],
      finish: S('garnish', 'Add jaggery and curry leaves and roast until the ghee glistens. Mangalore-style!', 3) },
    { k: 'stew', region: 'south', name: function (p) { return 'Kerala ' + p.n + ' Stew'; }, flav: 'Mild · Coconut milk', kcal: 210, color: '#f4e8c8', compat: 'veg chicken egg mutton fish tofu',
      ing: [I('2 tbsp', 'coconut oil'), I('1½ cups', 'coconut milk'), I('1', 'onion, sliced'), I('1 inch', 'ginger, julienned'), I('3', 'green chillies, slit'), I('2', 'potatoes, cubed'), I('4', 'cloves'), I('1 inch', 'cinnamon'), I('1 tsp', 'crushed pepper')],
      steps: [S('fry', 'Fry the whole spices, onion, ginger and chillies in coconut oil till soft — no browning.', 5), S('boil', 'Add potatoes with thin coconut milk and cook until tender.', 10)],
      finish: S('simmer', 'Pour in thick coconut milk, add pepper and warm through. Serve with appam.', 3) },
    { k: 'madras', region: 'south', name: function (p) { return 'Madras ' + p.n + ' Curry'; }, flav: 'Spicy · Tangy', kcal: 190, color: '#b43d1e', compat: 'chicken mutton egg veg chana prawn',
      ing: [I('3 tbsp', 'oil'), I('2', 'onions, chopped'), I('3', 'tomatoes'), I('2 tbsp', 'Madras curry powder'), I('1 tbsp', 'ginger-garlic paste'), I('½ cup', 'coconut milk'), I('1 tbsp', 'tamarind pulp'), I('1 sprig', 'curry leaves')],
      steps: [S('saute', 'Sauté onions and curry leaves until golden; add ginger-garlic paste.', 9), S('add', 'Add tomatoes and the curry powder; cook 6 minutes.', 6), S('stir', 'Stir in tamarind and coconut milk.', 2)],
      finish: S('simmer', 'Simmer until thick and serve with rice.', 4) },
    { k: 'gongura', region: 'south', name: function (p) { return 'Gongura ' + p.n; }, flav: 'Sour · Spicy', kcal: 180, color: '#5d4020', compat: 'mutton chicken prawn paneer egg',
      ing: [I('3 tbsp', 'oil'), I('2 cups', 'gongura (sorrel) leaves'), I('2', 'onions, chopped'), I('4', 'green chillies'), I('1 tbsp', 'ginger-garlic paste'), I('1½ tsp', 'chilli powder'), I('1 tsp', 'garam masala')],
      steps: [S('saute', 'Wilt the gongura leaves with green chillies in a little oil and mash to a paste.', 5), S('saute', 'Brown the onions, add ginger-garlic paste and the spice powders.', 9), S('add', 'Stir in the gongura paste.', 3)],
      finish: S('simmer', 'Simmer until oil floats — the Andhra favourite. Serve with rice.', 5) },
    { k: 'xacuti', region: 'south', name: function (p) { return p.n + ' Xacuti'; }, flav: 'Roasted coconut · Complex', kcal: 230, color: '#6b3a1e', compat: 'chicken mutton mushroom veg',
      ing: [I('3 tbsp', 'oil'), I('¾ cup', 'grated coconut'), I('6', 'dry red chillies'), I('1 tbsp', 'poppy seeds'), I('1 tsp', 'fennel'), I('2', 'star anise'), I('1', 'nutmeg piece'), I('2', 'onions, sliced'), I('1 tbsp', 'tamarind')],
      steps: [S('fry', 'Roast coconut and all the whole spices until deep brown and aromatic.', 7), S('blend', 'Grind with tamarind into a thick paste.', 3), S('saute', 'Brown the onions, add the paste and fry 5 minutes.', 13)],
      finish: S('simmer', 'Add water to the right consistency and simmer — a Goan classic.', 5) },
    { k: 'hyderabadi', region: 'south', name: function (p) { return 'Hyderabadi ' + p.n + ' Curry'; }, flav: 'Nutty · Tangy', kcal: 230, color: '#8c4a24', compat: 'chicken mutton egg paneer mushroom',
      ing: [I('3 tbsp', 'oil'), I('2 tbsp', 'peanuts'), I('1 tbsp', 'sesame seeds'), I('2 tbsp', 'dry coconut'), I('2', 'onions, sliced'), I('1 tbsp', 'ginger-garlic paste'), I('1 tbsp', 'tamarind pulp'), I('1 tsp', 'chilli powder'), I('1 sprig', 'curry leaves')],
      steps: [S('fry', 'Roast peanuts, sesame and coconut; grind to a paste.', 6), S('saute', 'Brown onions with curry leaves, add ginger-garlic paste and chilli powder.', 9), S('add', 'Add the nutty paste and tamarind with water.', 3)],
      finish: S('simmer', 'Simmer until oil floats. Great with bagara rice.', 6) }
  ];

  function curry(pk, st, vegan) {
    var p = P[pk]; p.k = pk;
    if (p.diet === 'vegan') vegan = true;
    var diet = vegan ? 'vegan' : p.diet;
    var name = (vegan && p.diet !== 'vegan' ? 'Vegan ' : '') + st.name(p);
    var ing = [I(p.q, p.item)].concat(st.ing);
    var steps = [p.prep].concat(st.steps, [S('add', p.cook, p.min)], [st.finish]);
    if (vegan) {
      ing = ing.map(function (x) { return I(x.q, veganize(x.item)); });
      steps = steps.filter(Boolean).map(function (s) { return S(s.act, veganize(s.text), s.min); });
    }
    add({ name: name, diet: diet, region: st.region, cats: [st.region, pk === 'paneer' ? 'paneer' : pk === 'egg' ? 'eggs' : '', 'curry'],
      kcal: st.kcal + p.kcal - (vegan ? 40 : 0), flav: st.flav, serves: 4, ing: ing, steps: steps,
      art: { kind: 'curry', base: st.color, piece: p.piece, pc: p.color, cream: /creamy|mild|coconut/i.test(st.flav) },
      desc: (st.region === 'south' ? 'A South Indian ' : 'A North Indian ') + st.flav.toLowerCase().replace(' · ', ' and ') + ' ' + p.n.toLowerCase() + ' curry.' });
  }
  ST.forEach(function (st) {
    st.compat.split(' ').forEach(function (pk) { if (P[pk]) curry(pk, st, false); });
    // vegan versions for plant proteins with dairy in the base
    if (st.region) ['tofu', 'chana', 'veg', 'mushroom', 'soya'].forEach(function (pk) { if (st.compat.indexOf(pk) >= 0 && P[pk].diet !== 'vegan' && !/\bpaneer\b/.test(st.ing.map(function (x) { return x.item; }).join(' '))) curry(pk, st, true); });
  });

  // expose helpers for the other recipe families
  root.__AK = { R: R, add: add, S: S, I: I, P: P, veganize: veganize, slug: slug };
})(typeof window !== 'undefined' ? window : globalThis);
