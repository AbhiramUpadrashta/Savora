/*
 * Savora — South Indian, North Indian, breads, dals, rice & biryani.
 * Copyright (c) 2026 Abhiram Upadrashta — MIT License
 */
(function (root) {
  'use strict';
  var A = root.__AK, add = A.add, S = A.S, I = A.I, veganize = A.veganize;
  function V(d) { return d; }

  // ------------------------------------------------------------------ dosa family
  var DOSA_BATTER = [I('2 cups', 'dosa batter (rice + urad dal, fermented overnight)'), I('2 tbsp', 'oil or ghee')];
  var dosaMake = [S('stir', 'Stir the fermented batter gently and add salt. It should pour like thick cream.', 2), S('fry', 'Heat a tawa till a sprinkle of water sizzles. Wipe with a cut onion dipped in oil.', 2),
    S('pour', 'Pour a ladle of batter in the centre and spread it outward in quick circles into a thin round.', 1), S('fry', 'Drizzle oil around the edges and cook on medium until golden and crisp underneath.', 3)];
  var DOSAS = [
    ['Plain Dosa', 'veg', [], 'Fold and serve hot with coconut chutney and sambar.', 170, 'Crisp · Tangy'],
    ['Masala Dosa', 'veg', [I('1 cup', 'potato masala (boiled potato, onion, mustard, turmeric, curry leaves)')], 'Place a scoop of potato masala in the centre, fold over and serve with chutney and sambar.', 290, 'Crisp · Savoury'],
    ['Mysore Masala Dosa', 'veg', [I('2 tbsp', 'red chutney (red chilli, garlic, onion)'), I('1 cup', 'potato masala')], 'Spread the fiery red chutney inside, add potato masala and fold.', 320, 'Spicy · Crisp'],
    ['Ghee Roast Dosa', 'veg', [I('3 tbsp', 'ghee')], 'Spread thin, drizzle generously with ghee and roast until it rolls into a golden cone.', 260, 'Buttery · Crisp'],
    ['Onion Dosa', 'veg', [I('1', 'onion, finely chopped'), I('2', 'green chillies, chopped')], 'Sprinkle onions and chillies over the wet dosa, press lightly and cook till crisp.', 210, 'Savoury · Crisp'],
    ['Podi Dosa', 'veg', [I('3 tbsp', 'gunpowder (idli podi)'), I('1 tbsp', 'sesame oil')], 'Sprinkle idli podi and sesame oil all over the dosa and fold into quarters.', 230, 'Spicy · Nutty'],
    ['Paper Dosa', 'veg', [], 'Spread extra thin into a giant round and roast until paper-crisp; roll into a tube.', 190, 'Extra crisp'],
    ['Cheese Dosa', 'veg', [I('½ cup', 'grated cheese')], 'Scatter cheese over the dosa, let it melt, then fold.', 330, 'Cheesy · Crisp'],
    ['Paneer Dosa', 'veg', [I('1 cup', 'paneer bhurji')], 'Fill with spiced paneer bhurji and fold.', 340, 'Savoury · Rich'],
    ['Egg Dosa', 'egg', [I('2', 'eggs'), I('1', 'onion, chopped'), I('½ tsp', 'pepper powder')], 'Crack an egg on the wet dosa, spread it with onion and pepper, flip for 30 seconds and serve.', 290, 'Savoury · Peppery'],
    ['Chicken Keema Dosa', 'nonveg', [I('1 cup', 'chicken keema masala')], 'Spread the chicken keema over the dosa and roast till crisp.', 380, 'Spicy · Meaty'],
    ['Schezwan Dosa', 'veg', [I('2 tbsp', 'schezwan sauce'), I('½ cup', 'mixed veggies, shredded')], 'Spread schezwan sauce and veggies, toss on the dosa and roll.', 280, 'Spicy · Indo-Chinese'],
    ['Spring Dosa', 'veg', [I('1 cup', 'stir-fried cabbage, carrot, capsicum & noodles')], 'Fill with the stir-fry, roll tightly and cut into pieces.', 300, 'Crunchy · Savoury'],
    ['Pizza Dosa', 'veg', [I('2 tbsp', 'pizza sauce'), I('½ cup', 'cheese'), I('½ cup', 'chopped veggies')], 'Top like a pizza with sauce, veggies and cheese, cover until the cheese melts.', 350, 'Cheesy · Fun']
  ];
  DOSAS.forEach(function (d) {
    add({ name: d[0], diet: d[1], region: 'south', cats: ['south', 'breakfast', /paneer/i.test(d[0]) ? 'paneer' : '', d[1] === 'egg' ? 'eggs' : ''], kcal: d[4], flav: d[5], serves: 2,
      ing: DOSA_BATTER.concat(d[2], [I('', 'salt to taste')]), steps: dosaMake.concat([S('serve', d[3], 1)]), art: { kind: 'dosa', base: '#e5a64b' },
      desc: 'Golden, crisp South Indian dosa made from fermented rice and lentil batter.' });
  });
  [['Rava Dosa', 'Semolina', [I('1 cup', 'rava (semolina)'), I('½ cup', 'rice flour'), I('2 tbsp', 'maida'), I('1', 'onion, chopped'), I('1 tsp', 'cumin'), I('1 tsp', 'crushed pepper')], 'Mix rava, rice flour and maida with 3 cups water into a thin, watery batter. Rest 20 minutes.', 220],
    ['Onion Rava Dosa', 'Onion semolina', [I('1 cup', 'rava'), I('½ cup', 'rice flour'), I('2', 'onions, finely chopped'), I('2', 'green chillies'), I('1 tsp', 'cumin')], 'Make a watery batter of rava and rice flour; add onions and chillies. Rest 20 minutes.', 240],
    ['Neer Dosa', 'Mangalorean rice', [I('1 cup', 'rice, soaked 4 hours'), I('½ cup', 'grated coconut')], 'Grind soaked rice with coconut into a very thin, watery batter — no fermentation needed.', 160],
    ['Pesarattu', 'Green gram', [I('1 cup', 'whole green moong, soaked'), I('1 inch', 'ginger'), I('2', 'green chillies'), I('1', 'onion, chopped')], 'Grind the soaked moong with ginger and chillies into a thick batter.', 200],
    ['Set Dosa', 'Soft spongy', [I('2 cups', 'dosa batter'), I('¼ cup', 'poha, soaked & ground')], 'Mix ground poha into the batter for extra softness.', 220],
    ['Adai', 'Mixed lentil', [I('½ cup', 'rice'), I('½ cup', 'mixed dals (toor, chana, urad)'), I('4', 'dry red chillies'), I('1 sprig', 'curry leaves')], 'Soak rice and dals 3 hours, grind coarsely with red chillies.', 230],
    ['Ragi Dosa', 'Finger millet', [I('1 cup', 'ragi flour'), I('¼ cup', 'rice flour'), I('¼ cup', 'curd'), I('1', 'onion, chopped')], 'Whisk ragi and rice flours with curd and water into a thin batter.', 180],
    ['Oats Dosa', 'Instant oats', [I('1 cup', 'oats, powdered'), I('¼ cup', 'rava'), I('¼ cup', 'curd'), I('1', 'green chilli')], 'Mix powdered oats, rava and curd with water; rest 10 minutes.', 170],
    ['Wheat Dosa', 'Instant wheat', [I('1 cup', 'wheat flour'), I('2 tbsp', 'rice flour'), I('1', 'onion, chopped'), I('½ tsp', 'cumin')], 'Whisk wheat and rice flour with water into a lump-free thin batter.', 190]
  ].forEach(function (d) {
    add({ name: d[0], diet: 'veg', region: 'south', cats: ['south', 'breakfast'], kcal: d[4], flav: d[1] + ' · Crisp', serves: 2, ing: d[2].concat([I('2 tbsp', 'oil'), I('', 'salt to taste')]),
      steps: [S('mix', d[3], 5), S('fry', 'Heat the tawa well and grease it lightly.', 2), S('pour', 'Pour the batter from a height to form a lacy dosa (or spread thick batters in circles).', 1), S('fry', 'Drizzle oil and cook until crisp and golden.', 4), S('serve', 'Serve hot with coconut chutney and sambar.', 1)],
      art: { kind: 'dosa', base: /ragi/i.test(d[0]) ? '#8a5a3c' : /pesarattu/i.test(d[0]) ? '#8fae4a' : '#e1ad5c' } });
  });
  // uttapam
  [['Onion Uttapam', [I('2', 'onions, chopped')]], ['Tomato Uttapam', [I('2', 'tomatoes, chopped')]], ['Mixed Veg Uttapam', [I('1 cup', 'onion, tomato, carrot, capsicum')]], ['Podi Uttapam', [I('2 tbsp', 'idli podi')]], ['Cheese Uttapam', [I('½ cup', 'grated cheese'), I('1', 'onion')]], ['Coconut Uttapam', [I('½ cup', 'grated coconut'), I('1', 'green chilli')]]].forEach(function (u) {
    add({ name: u[0], diet: 'veg', region: 'south', cats: ['south', 'breakfast'], kcal: 240, flav: 'Soft · Savoury', ing: [I('2 cups', 'thick dosa batter')].concat(u[1], [I('2', 'green chillies'), I('2 tbsp', 'coriander'), I('2 tbsp', 'oil')]),
      steps: [S('pour', 'Pour a ladle of thick batter on a hot tawa and spread into a thick pancake.', 1), S('add', 'Scatter the toppings, chillies and coriander; press lightly.', 1), S('fry', 'Drizzle oil, cover and cook 3 minutes; flip and cook 2 more.', 5), S('serve', 'Serve with coconut chutney and sambar.', 1)], art: { kind: 'dosa', base: '#e8b964', top: true } });
  });

  // ------------------------------------------------------------------ idli, vada & friends
  var IDLIS = [
    ['Idli', [I('2 cups', 'idli batter')], [S('stir', 'Stir the fermented idli batter and add salt.', 1), S('pour', 'Grease the idli plates and fill each mould ¾ full.', 3), S('steam', 'Steam 10–12 minutes until a toothpick comes out clean.', 12), S('rest', 'Rest 2 minutes and scoop out with a wet spoon.', 2), S('serve', 'Serve with sambar and coconut chutney.', 1)], 150],
    ['Rava Idli', [I('1 cup', 'rava'), I('1 cup', 'curd'), I('½ tsp', 'Eno fruit salt'), I('1 tsp', 'mustard'), I('8', 'cashews'), I('1', 'carrot, grated')], [S('fry', 'Roast rava in ghee with mustard, cashews and curry leaves.', 4), S('mix', 'Cool, mix with curd, carrot and salt; rest 15 minutes.', 15), S('mix', 'Stir in Eno just before steaming.', 1), S('steam', 'Steam 12 minutes.', 12), S('serve', 'Serve with chutney.', 1)], 190],
    ['Podi Idli', [I('12', 'mini idlis'), I('3 tbsp', 'idli podi'), I('2 tbsp', 'ghee')], [S('fry', 'Warm ghee in a pan.', 1), S('add', 'Add the mini idlis and sprinkle podi.', 1), S('stir', 'Toss until every idli is coated.', 2), S('serve', 'Serve hot as a snack.', 1)], 230],
    ['Fried Idli', [I('6', 'leftover idlis'), I('2 tbsp', 'oil'), I('½ tsp', 'chilli powder'), I('1 sprig', 'curry leaves')], [S('chop', 'Cut leftover idlis into fingers.', 2), S('fry', 'Shallow-fry until crisp.', 6), S('stir', 'Toss with chilli powder, salt and curry leaves.', 1), S('serve', 'Serve with ketchup or chutney.', 1)], 260],
    ['Idli Upma', [I('6', 'leftover idlis, crumbled'), I('1', 'onion'), I('1 tsp', 'mustard'), I('1 tsp', 'urad dal'), I('2', 'green chillies')], [S('fry', 'Temper mustard, urad dal, chillies and curry leaves.', 2), S('saute', 'Sauté onion 3 minutes.', 3), S('add', 'Add crumbled idlis and a pinch of turmeric; toss.', 3), S('serve', 'Finish with coriander and lemon.', 1)], 210],
    ['Kanchipuram Idli', [I('2 cups', 'idli batter'), I('1 tsp', 'pepper'), I('1 tsp', 'cumin'), I('1 tbsp', 'ginger'), I('2 tbsp', 'ghee'), I('8', 'cashews')], [S('fry', 'Fry pepper, cumin, ginger and cashews in ghee.', 2), S('mix', 'Mix the tempering into the batter.', 1), S('pour', 'Pour into cups or banana-leaf lined moulds.', 2), S('steam', 'Steam 20 minutes.', 20), S('serve', 'Serve with chutney.', 1)], 210],
    ['Medu Vada', [I('1 cup', 'urad dal, soaked 4 hours'), I('1 tsp', 'pepper'), I('1 tbsp', 'ginger'), I('1 sprig', 'curry leaves'), I('', 'oil for frying')], [S('blend', 'Grind urad dal with very little water into a fluffy batter.', 6), S('mix', 'Add pepper, ginger, curry leaves and salt; beat well.', 2), S('fry', 'Shape doughnuts with wet hands and deep-fry until golden.', 10), S('serve', 'Serve with chutney and sambar.', 1)], 280],
    ['Sambar Vada', [I('6', 'medu vadas'), I('2 cups', 'hot sambar'), I('1', 'onion, chopped')], [S('add', 'Place the vadas in a bowl.', 1), S('pour', 'Pour hot sambar over them and soak 5 minutes.', 5), S('garnish', 'Top with onion and coriander.', 1)], 320],
    ['Dahi Vada', [I('8', 'urad dal vadas'), I('2 cups', 'thick curd, whisked'), I('2 tbsp', 'tamarind chutney'), I('1 tsp', 'roasted cumin powder')], [S('boil', 'Soak fried vadas in warm water 15 minutes; squeeze gently.', 15), S('pour', 'Arrange and pour sweetened curd over them.', 2), S('garnish', 'Drizzle chutneys, cumin and chilli powder.', 1)], 300],
    ['Masala Vada', [I('1 cup', 'chana dal, soaked'), I('1', 'onion, chopped'), I('2', 'green chillies'), I('1 sprig', 'curry leaves'), I('½ tsp', 'fennel')], [S('blend', 'Coarsely grind chana dal without water.', 3), S('mix', 'Mix in onion, chillies, curry leaves, fennel and salt.', 2), S('fry', 'Shape patties and deep-fry until crunchy.', 10), S('serve', 'Serve with tea!', 1)], 270],
    ['Rava Upma', [I('1 cup', 'rava'), I('1', 'onion'), I('2', 'green chillies'), I('1 tsp', 'mustard'), I('1 tsp', 'urad dal'), I('2 tbsp', 'ghee')], [S('fry', 'Dry-roast the rava until aromatic.', 4), S('fry', 'Temper mustard, urad dal, chillies and curry leaves in ghee; sauté onion.', 4), S('boil', 'Add 2½ cups water with salt and bring to a boil.', 3), S('stir', 'Rain in the rava while stirring to avoid lumps; cover 2 minutes.', 3), S('serve', 'Finish with ghee and lemon.', 1)], 250],
    ['Semiya Upma', [I('1½ cups', 'vermicelli, roasted'), I('1', 'onion'), I('1', 'carrot'), I('¼ cup', 'peas'), I('1 tsp', 'mustard')], [S('fry', 'Temper mustard and curry leaves; sauté onion and veggies.', 5), S('boil', 'Add 2 cups water and salt; boil.', 3), S('add', 'Add vermicelli and cook covered until water is absorbed.', 5), S('serve', 'Squeeze lemon and serve.', 1)], 240],
    ['Ven Pongal', [I('½ cup', 'rice'), I('¼ cup', 'moong dal'), I('3 tbsp', 'ghee'), I('1 tsp', 'pepper'), I('1 tsp', 'cumin'), I('1 tbsp', 'ginger'), I('10', 'cashews')], [S('fry', 'Dry-roast moong dal lightly.', 3), S('pressure', 'Pressure-cook rice and dal with 4 cups water for 4 whistles.', 15), S('fry', 'Fry pepper, cumin, ginger, cashews and curry leaves in ghee.', 2), S('stir', 'Pour the tempering over and mash well.', 1), S('serve', 'Serve with coconut chutney and sambar.', 1)], 320],
    ['Sweet Pongal', [I('½ cup', 'rice'), I('¼ cup', 'moong dal'), I('1 cup', 'jaggery'), I('3 tbsp', 'ghee'), I('10', 'cashews'), I('10', 'raisins'), I('½ tsp', 'cardamom')], [S('pressure', 'Pressure-cook rice and dal soft.', 15), S('boil', 'Melt jaggery in ½ cup water and strain.', 4), S('stir', 'Mix the syrup into the rice and cook 5 minutes.', 5), S('fry', 'Fry cashews and raisins in ghee and pour over with cardamom.', 2)], 380],
    ['Appam', [I('2 cups', 'raw rice, soaked'), I('½ cup', 'grated coconut'), I('½ cup', 'cooked rice'), I('1 tsp', 'sugar'), I('½ tsp', 'yeast')], [S('blend', 'Grind soaked rice, coconut and cooked rice into a smooth batter.', 6), S('mix', 'Add yeast and sugar; ferment 8 hours.', 5), S('pour', 'Pour a ladle into a hot appachatti and swirl to coat the sides.', 1), S('steam', 'Cover and cook until the centre is spongy and edges lacy.', 3), S('serve', 'Serve with vegetable stew.', 1)], 180],
    ['Idiyappam', [I('2 cups', 'roasted rice flour'), I('2 cups', 'boiling water'), I('1 tsp', 'oil'), I('½ cup', 'grated coconut')], [S('mix', 'Add boiling water and oil to the rice flour and mix into a soft dough.', 5), S('knead', 'Knead while warm until smooth.', 3), S('pour', 'Press through an idiyappam press onto idli plates; sprinkle coconut.', 5), S('steam', 'Steam 8 minutes.', 8), S('serve', 'Serve with kurma or stew.', 1)], 200],
    ['Puttu', [I('2 cups', 'puttu podi (rice flour)'), I('1 cup', 'grated coconut'), I('', 'water & salt')], [S('mix', 'Sprinkle salted water over the flour and rub until it looks like wet sand.', 5), S('add', 'Layer coconut and flour alternately in the puttu maker.', 2), S('steam', 'Steam until steam escapes the top, about 8 minutes.', 8), S('serve', 'Serve with kadala curry or banana.', 1)], 230],
    ['Kuzhi Paniyaram', [I('2 cups', 'idli batter'), I('1', 'onion, chopped'), I('2', 'green chillies'), I('1 tsp', 'mustard'), I('2 tbsp', 'coconut')], [S('fry', 'Temper mustard, onion and chillies; mix into the batter with coconut.', 3), S('pour', 'Grease the paniyaram pan and fill each cavity.', 2), S('fry', 'Cook covered 3 minutes, flip and cook until golden.', 6), S('serve', 'Serve with chutney.', 1)], 230]
  ];
  IDLIS.forEach(function (d) {
    var sweet = /sweet/i.test(d[0]);
    add({ name: d[0], diet: 'veg', region: 'south', cats: ['south', 'breakfast', /vada/i.test(d[0]) ? 'snacks' : ''], kcal: d[3], flav: sweet ? 'Sweet · Ghee' : 'Soft · Savoury', ing: d[1].concat(sweet ? [] : [I('', 'salt to taste')]), steps: d[2],
      art: { kind: /vada/i.test(d[0]) ? 'vada' : /idli/i.test(d[0]) ? 'idli' : /upma|pongal|puttu/i.test(d[0]) ? 'bowl' : /appam|paniyaram/i.test(d[0]) ? 'idli' : 'bowl', base: sweet ? '#c98a3a' : '#f3ead0' } });
  });

  // ------------------------------------------------------------------ sambar, rasam, kuzhambu, chutneys
  var SAMBAR = ['Drumstick', 'Onion (Shallot)', 'Mixed Vegetable', 'Radish', 'Brinjal', 'Pumpkin', 'Okra (Vendakkai)', 'Carrot Beans', 'Tomato', 'Arachuvitta'];
  SAMBAR.forEach(function (v) {
    add({ name: v + ' Sambar', diet: 'vegan', region: 'south', cats: ['south', 'dal'], kcal: 160, flav: 'Tangy · Spicy', serves: 4,
      ing: [I('¾ cup', 'toor dal'), I('1½ cups', /arachu/i.test(v) ? 'mixed vegetables' : v.toLowerCase().replace(/ \(.*\)/, '') + (/onion/i.test(v) ? '' : ', chopped')), I('1 tbsp', 'tamarind pulp'), I('2 tbsp', 'sambar powder'), I('1', 'tomato'), I('1 tsp', 'mustard'), I('pinch', 'asafoetida'), I('2 sprigs', 'curry leaves'), I('2 tbsp', 'oil'), I('2 tbsp', 'coriander')],
      steps: [S('pressure', 'Pressure-cook toor dal with turmeric for 4 whistles and mash.', 15), S('boil', 'Boil the vegetables and tomato in tamarind water with salt until tender.', 10), S('add', /arachu/i.test(v) ? 'Grind roasted coriander seeds, chana dal, red chillies and coconut; add this fresh masala.' : 'Add sambar powder and simmer 3 minutes.', 3), S('pour', 'Pour in the dal and simmer 5 minutes.', 5), S('fry', 'Temper mustard, asafoetida, red chilli and curry leaves in oil and pour over.', 2), S('garnish', 'Finish with coriander. Serve with rice, idli or dosa.', 1)],
      art: { kind: 'curry', base: '#c86d2a', piece: 'veg', pc: '#9ac25a' } });
  });
  [['Tomato Rasam', 'tomatoes', 'Tangy'], ['Pepper Rasam', 'black pepper & cumin', 'Peppery'], ['Lemon Rasam', 'lemon juice', 'Citrusy'], ['Garlic Rasam', 'garlic', 'Garlicky'], ['Pineapple Rasam', 'pineapple', 'Sweet-sour'], ['Mysore Rasam', 'roasted coconut masala', 'Aromatic'], ['Dal Rasam', 'toor dal water', 'Comforting'], ['Ginger Rasam', 'ginger', 'Warming']].forEach(function (r) {
    add({ name: r[0], diet: 'vegan', region: 'south', cats: ['south', 'soups', 'dal'], kcal: 70, flav: r[2] + ' · Light', serves: 4,
      ing: [I('1 tbsp', 'tamarind pulp'), I('2', 'tomatoes, crushed'), I('1 tsp', 'rasam powder'), I('1 tsp', 'pepper-cumin, crushed'), I('4 cloves', 'garlic, crushed'), I('', r[1]), I('1 tsp', 'mustard'), I('pinch', 'asafoetida'), I('1 sprig', 'curry leaves'), I('2 tbsp', 'coriander')],
      steps: [S('boil', 'Boil tamarind water with tomatoes, salt, turmeric and rasam powder for 8 minutes.', 8), S('add', 'Add the ' + r[1] + ', crushed pepper-cumin and garlic.', 1), S('simmer', 'Add 2 cups water and heat until it just froths — never let rasam boil hard.', 3), S('fry', 'Temper mustard, asafoetida and curry leaves in ghee or oil and pour over.', 2), S('garnish', 'Add coriander. Drink it as soup or pour over rice.', 1)], art: { kind: 'soup', base: '#d25a2a' } });
  });
  [['Vatha Kuzhambu', 'sundakkai (dried berries)', '#5a3218'], ['Puli Kuzhambu', 'shallots & garlic', '#6b3a1c'], ['Mor Kuzhambu', 'ash gourd in spiced curd', '#f0dc8a'], ['Kara Kuzhambu', 'brinjal', '#6a2d18'], ['Moru Curry', 'spiced buttermilk', '#f2e08e'], ['Avial', 'mixed vegetables in coconut-curd', '#e9dca0'], ['Olan', 'ash gourd & cowpeas in coconut milk', '#f4ecd2'], ['Erissery', 'pumpkin & red beans with roasted coconut', '#e39a3b'], ['Pulissery', 'ripe mango in curd', '#f1c24d'], ['Kootu Curry', 'chana & raw banana with coconut', '#c9a35c']].forEach(function (k) {
    var curd = /curd|buttermilk/.test(k[1]);
    add({ name: k[0], diet: curd ? 'veg' : 'vegan', region: 'south', cats: ['south', 'curry'], kcal: 170, flav: curd ? 'Tangy · Mild' : 'Tangy · Spicy', serves: 4,
      ing: [I('2 cups', k[1]), I(curd ? '1 cup' : '1 tbsp', curd ? 'curd, whisked' : 'tamarind pulp'), I('½ cup', 'grated coconut'), I('2', 'green chillies'), I('1 tsp', 'cumin'), I('1 tsp', 'mustard'), I('2 sprigs', 'curry leaves'), I('2 tbsp', 'coconut oil')],
      steps: [S('chop', 'Prepare the ' + k[1].split(' ')[0] + ' and cut into pieces.', 5), S('blend', 'Grind coconut, green chillies and cumin to a paste.', 3), S('boil', 'Cook the vegetables with turmeric and salt until tender.', 10), S('add', 'Add the ground paste ' + (curd ? 'and the whisked curd' : 'and tamarind') + '; simmer 4 minutes.', 4), S('fry', 'Temper mustard, red chilli and curry leaves in coconut oil and pour over.', 2), S('serve', 'Serve with hot rice.', 1)],
      art: { kind: 'curry', base: k[2], piece: 'veg', pc: '#a5c86b' } });
  });
  [['Coconut Chutney', 'grated coconut', '#f6f0dc'], ['Tomato Chutney', 'tomatoes', '#d6442a'], ['Peanut Chutney', 'roasted peanuts', '#b98548'], ['Onion Chutney', 'onions', '#b44a2c'], ['Mint Chutney', 'mint leaves', '#3d8a3a'], ['Coriander Chutney', 'coriander leaves', '#3f9142'], ['Ginger Chutney', 'ginger', '#c9953f'], ['Gongura Chutney', 'gongura leaves', '#4c3a1f'], ['Coconut Coriander Chutney', 'coconut & coriander', '#b5d69a'], ['Red Chilli Garlic Chutney', 'red chillies & garlic', '#b3281c']].forEach(function (c) {
    add({ name: c[0], diet: 'vegan', region: 'south', cats: ['south', 'chutney'], kcal: 90, flav: 'Fresh · Spicy', serves: 4,
      ing: [I('1 cup', c[1]), I('2', 'green chillies'), I('1 tbsp', 'roasted chana dal'), I('small piece', 'tamarind'), I('1 tsp', 'mustard'), I('1 tsp', 'urad dal'), I('1 sprig', 'curry leaves'), I('1 tbsp', 'oil')],
      steps: [S('fry', /coconut|mint|coriander/i.test(c[1]) ? 'Keep the ' + c[1] + ' ready.' : 'Sauté the ' + c[1] + ' with green chillies in a little oil until soft.', 5), S('blend', 'Grind with roasted chana dal, tamarind, salt and a splash of water.', 3), S('fry', 'Temper mustard, urad dal and curry leaves in oil and pour over.', 2), S('serve', 'Serve with idli, dosa or vada.', 1)],
      art: { kind: 'chutney', base: c[2] } });
  });
  // poriyal / thoran / fry — vegetables × south styles
  var VEG = [['Cabbage', '#bcd98a'], ['Beans', '#5f9e3a'], ['Carrot', '#ee8b2f'], ['Beetroot', '#a3264a'], ['Potato', '#e7c05a'], ['Raw Banana', '#c7c07a'], ['Chow Chow', '#cfe3a2'], ['Okra', '#4f8a35'], ['Brinjal', '#6b3b73'], ['Drumstick Leaves', '#3f7a2e'], ['Snake Gourd', '#9cc26a'], ['Bitter Gourd', '#4d7f2c'], ['Yam', '#b9895a'], ['Cauliflower', '#efe5c5'], ['Capsicum', '#58a13c']];
  var SSTY = [['Poriyal', 'Tamil-style stir-fry with coconut', 'Mild · Coconut'], ['Thoran', 'Kerala-style with crushed coconut & shallots', 'Mild · Coconut'], ['Fry', 'crisp spiced fry', 'Spicy · Crisp']];
  VEG.forEach(function (v) {
    SSTY.forEach(function (s) {
      if (s[0] === 'Fry' && /Cabbage|Drumstick|Snake|Chow/.test(v[0])) return;
      if (s[0] === 'Thoran' && /Potato|Okra|Brinjal|Yam|Capsicum|Cauliflower/.test(v[0])) return;
      add({ name: v[0] + ' ' + s[0], diet: 'vegan', region: 'south', cats: ['south', 'sabzi'], kcal: s[0] === 'Fry' ? 180 : 120, flav: s[2], serves: 3,
        ing: [I('3 cups', v[0].toLowerCase() + ', finely chopped'), I('2 tbsp', 'coconut oil'), I('1 tsp', 'mustard seeds'), I('1 tsp', 'urad dal'), I('2', 'dry red chillies'), I('1 sprig', 'curry leaves'), s[0] === 'Fry' ? I('1 tsp', 'chilli powder') : I('½ cup', 'grated coconut'), I('¼ tsp', 'turmeric')],
        steps: [S('chop', 'Wash and finely chop the ' + v[0].toLowerCase() + '.', 6), S('fry', 'Crackle mustard, urad dal, red chillies and curry leaves in coconut oil.', 2), S('saute', 'Add the ' + v[0].toLowerCase() + ', turmeric and salt; cook covered, stirring now and then.', s[0] === 'Fry' ? 14 : 10),
          s[0] === 'Fry' ? S('fry', 'Uncover, add chilli powder and roast until crisp at the edges.', 5) : S('add', 'Add the grated coconut and toss 2 minutes.', 2), S('serve', 'Serve as a side with rice, sambar and rasam — ' + s[1] + '.', 1)],
        art: { kind: 'dry', base: v[1] } });
    });
  });

  // ------------------------------------------------------------------ dals
  [['Dal Tadka', 'toor dal', 'north', 'ghee, cumin, garlic, red chilli'], ['Dal Makhani', 'whole urad & rajma', 'north', 'butter & cream'], ['Dal Fry', 'toor & masoor dal', 'north', 'onion-tomato masala'], ['Chana Dal', 'chana dal', 'north', 'ginger & garam masala'], ['Moong Dal', 'yellow moong dal', 'north', 'cumin & ghee'], ['Masoor Dal', 'red lentils', 'north', 'garlic tadka'], ['Panchmel Dal', 'five lentils', 'north', 'Rajasthani spices'], ['Dal Palak', 'toor dal with spinach', 'north', 'garlic & cumin'], ['Andhra Pappu', 'toor dal with tomato', 'south', 'garlic & red chilli'], ['Mango Dal', 'toor dal with raw mango', 'south', 'mustard & curry leaves'], ['Keerai Kootu', 'moong dal with greens', 'south', 'coconut'], ['Dal Tomato', 'toor dal', 'south', 'tomato & tamarind'], ['Parippu Curry', 'moong dal with coconut', 'south', 'coconut & shallots'], ['Dal Dhokli', 'toor dal with wheat dumplings', 'north', 'sweet-sour Gujarati spices']].forEach(function (d) {
    var dairy = /butter|cream|ghee/.test(d[3]);
    add({ name: d[0], diet: dairy ? 'veg' : 'vegan', region: d[2], cats: [d[2], 'dal'], kcal: d[0] === 'Dal Makhani' ? 340 : 210, flav: d[0] === 'Dal Makhani' ? 'Creamy · Smoky' : 'Comforting · Mild', serves: 4,
      ing: [I('1 cup', d[1]), I('1', 'onion, chopped'), I('2', 'tomatoes, chopped'), I('1 tbsp', 'ginger-garlic, chopped'), I('2', 'green chillies'), I('½ tsp', 'turmeric'), I('1 tsp', 'cumin'), I('2 tbsp', dairy ? 'ghee' : 'oil'), I('2 tbsp', 'coriander')],
      steps: [S('boil', 'Rinse the ' + d[1] + ' and soak 20 minutes' + (/whole urad/.test(d[1]) ? ' (overnight for whole urad).' : '.'), 5), S('pressure', 'Pressure-cook with turmeric, salt and water until completely soft.', d[0] === 'Dal Makhani' ? 40 : 15), S('saute', 'Sauté onion, ginger-garlic, chillies and tomatoes until soft.', 8), S('add', 'Add the cooked dal and simmer 5 minutes to the right consistency.', 5), S('fry', 'Make the tadka with ' + d[3] + ' and pour it sizzling over the dal.', 2), S('garnish', 'Garnish with coriander. Serve with rice or roti.', 1)],
      art: { kind: 'dal', base: d[0] === 'Dal Makhani' ? '#6a2b1d' : d[0] === 'Dal Palak' ? '#8aa33c' : '#e3b23c' } });
  });

  // ------------------------------------------------------------------ north sabzis
  var SABZI = [
    ['Aloo Gobi', 'potatoes & cauliflower', '#e3b64d'], ['Jeera Aloo', 'potatoes with cumin', '#e6be5a'], ['Bhindi Masala', 'okra', '#5a8e35'], ['Baingan Bharta', 'smoky roasted brinjal', '#6b4a3a'], ['Aloo Matar', 'potatoes & peas', '#d98f3a'],
    ['Aloo Methi', 'potatoes & fenugreek', '#a7b14a'], ['Gobi Matar', 'cauliflower & peas', '#e7d38a'], ['Mix Veg Sabzi', 'mixed vegetables', '#b5a34a'], ['Lauki Sabzi', 'bottle gourd', '#b9cf8a'], ['Tinda Masala', 'round gourd', '#9fbf6a'],
    ['Karela Fry', 'bitter gourd', '#476f28'], ['Aloo Shimla Mirch', 'potato & capsicum', '#86b04a'], ['Dum Aloo', 'baby potatoes in spicy gravy', '#c85a28'], ['Kashmiri Dum Aloo', 'baby potatoes in yoghurt-fennel gravy', '#b3371f'], ['Sarson Ka Saag', 'mustard greens', '#3f6d2a'],
    ['Chole Masala', 'chickpeas in dark masala', '#6d3a1d'], ['Rajma Masala', 'kidney beans', '#7c2a22'], ['Kadhi Pakora', 'besan dumplings in curd kadhi', '#f0c64a'], ['Matar Mushroom', 'peas & mushrooms', '#a57c55'], ['Paneer Bhurji', 'scrambled paneer', '#f1dea0'],
    ['Methi Matar Malai', 'fenugreek & peas in cream', '#d7e0a4'], ['Navratan Korma', 'nine gems — veggies, fruit & nuts', '#eed7a0'], ['Veg Kolhapuri', 'fiery mixed veg', '#9c3120'], ['Pindi Chana', 'dry Punjabi chickpeas', '#5c3218'], ['Aloo Baingan', 'potato & brinjal', '#7b4d4f'],
    ['Gatte Ki Sabzi', 'gram-flour dumplings in curd gravy', '#e2a04a'], ['Undhiyu', 'Gujarati winter veg', '#6f8f3a'], ['Aloo Tamatar', 'potato-tomato curry', '#c8522a'], ['Shahi Paneer', 'paneer in royal white gravy', '#f0cf9a'], ['Matar Paneer', 'paneer & peas', '#d9772f'],
    ['Paneer Pasanda', 'stuffed paneer sandwiches in gravy', '#e59a4a'], ['Paneer Kofta Curry', 'paneer balls in gravy', '#d5763a'], ['Kaju Masala', 'cashews in rich gravy', '#d98d4a'], ['Mushroom Masala', 'mushroom in onion-tomato gravy', '#8a5b3a'], ['Soya Keema', 'minced soya', '#8a5634']
  ];
  SABZI.forEach(function (s) {
    var dairy = /paneer|curd|cream|malai|korma|kadhi|shahi|kofta|gatte|kaju/i.test(s[0] + s[1]);
    var gravy = /masala|curry|gravy|korma|kadhi|dum|chole|rajma|matar paneer|shahi|pasanda|kofta|kaju/i.test(s[0] + ' ' + s[1]);
    add({ name: s[0], diet: dairy ? 'veg' : 'vegan', region: 'north', cats: ['north', /paneer/i.test(s[0]) ? 'paneer' : '', gravy ? 'curry' : 'sabzi'], kcal: dairy ? 260 : 170, flav: /kolhapuri|pindi|dum/i.test(s[0]) ? 'Spicy · Bold' : dairy ? 'Rich · Creamy' : 'Homestyle · Spiced', serves: 4,
      ing: [I('3 cups', s[1]), I('3 tbsp', dairy ? 'ghee' : 'oil'), I('1 tsp', 'cumin seeds'), I('1', 'onion, chopped'), I('2', 'tomatoes, chopped'), I('1 tbsp', 'ginger-garlic paste'), I('½ tsp', 'turmeric'), I('1 tsp', 'chilli powder'), I('2 tsp', 'coriander powder'), I('1 tsp', 'garam masala'), dairy ? I('3 tbsp', 'fresh cream or curd') : I('1 tsp', 'amchur'), I('2 tbsp', 'coriander leaves')],
      steps: [S('chop', 'Prepare the ' + s[1] + ' — wash, peel and cut into even pieces.', 8), S('fry', 'Crackle cumin seeds in hot ' + (dairy ? 'ghee' : 'oil') + '.', 1), S('saute', 'Sauté onion 6 minutes, add ginger-garlic paste and tomatoes; cook till soft.', 9), S('add', 'Add turmeric, chilli and coriander powders with a splash of water; cook the masala 3 minutes.', 3), S('stir', 'Add the ' + s[1].split(' ')[0] + ' and salt. Mix well, cover and cook until tender.', 12),
        dairy ? S('stir', 'Lower the heat and stir in the cream or whisked curd.', 2) : S('add', 'Sprinkle amchur for a gentle tang.', 1), S('garnish', 'Finish with garam masala and coriander. Serve with roti or rice.', 1)],
      art: { kind: gravy ? 'curry' : 'dry', base: s[2], piece: /paneer|kofta|gatte/i.test(s[0]) ? 'cube' : /chana|chole|rajma/i.test(s[0]) ? 'bean' : 'veg', pc: /paneer/i.test(s[0]) ? '#f7ecd0' : '#e8c36a' } });
  });

  // ------------------------------------------------------------------ breads
  var PARATHA = ['Aloo', 'Gobi', 'Paneer', 'Mooli', 'Methi', 'Onion', 'Cheese', 'Egg', 'Keema', 'Pudina', 'Palak', 'Mix Veg', 'Dal', 'Lachha'];
  PARATHA.forEach(function (p) {
    var diet = p === 'Egg' ? 'egg' : p === 'Keema' ? 'nonveg' : 'veg';
    add({ name: p + ' Paratha', diet: diet, region: 'north', cats: ['north', 'bread', 'breakfast', p === 'Paneer' ? 'paneer' : '', p === 'Egg' ? 'eggs' : ''], kcal: p === 'Lachha' ? 260 : 300, flav: p === 'Lachha' ? 'Flaky · Buttery' : 'Stuffed · Savoury', serves: 2,
      ing: [I('2 cups', 'whole wheat flour'), I('', p === 'Lachha' ? 'ghee for layering' : p === 'Egg' ? '3 eggs, beaten with onion & chilli' : p === 'Keema' ? '1 cup cooked mutton keema' : '1½ cups ' + p.toLowerCase() + ' stuffing'), I('1 tsp', 'ajwain'), I('1', 'green chilli, chopped'), I('½ tsp', 'garam masala'), I('3 tbsp', 'ghee or butter'), I('', 'salt')],
      steps: [S('knead', 'Knead the flour with salt, ajwain and water into a soft dough. Rest 15 minutes.', 18), S('mix', p === 'Lachha' ? 'Roll thin, brush ghee, pleat like a fan and coil into a spiral.' : p === 'Egg' ? 'Beat the eggs with onion, chilli and salt.' : 'Prepare the ' + p.toLowerCase() + ' stuffing with chilli, garam masala and salt.', 5),
        S('roll', p === 'Egg' ? 'Roll a paratha, half-cook it, slit a pocket and pour the egg in.' : p === 'Lachha' ? 'Roll the spiral gently into a thick round.' : 'Stuff a ball of dough, seal and roll out gently.', 3), S('fry', 'Cook on a hot tawa, flipping and brushing with ghee until golden spots appear.', 5), S('serve', 'Serve hot with butter, curd and pickle.', 1)],
      art: { kind: 'bread', base: '#d9a25a' } });
  });
  [['Butter Naan', 'maida, curd, yeast', 280], ['Garlic Naan', 'maida, curd, garlic & coriander', 300], ['Tandoori Roti', 'whole wheat', 170], ['Phulka', 'whole wheat, no oil', 110], ['Rumali Roti', 'maida & wheat, paper-thin', 160], ['Kulcha', 'maida, curd, baking soda', 250], ['Amritsari Kulcha', 'stuffed with spiced potato', 330], ['Bhatura', 'maida with curd, deep-fried', 320], ['Puri', 'whole wheat, deep-fried', 220], ['Missi Roti', 'besan & wheat with spices', 200], ['Thepla', 'wheat & methi, Gujarati', 190], ['Makki Ki Roti', 'maize flour', 210], ['Malabar Parotta', 'layered maida flatbread', 330], ['Chapati', 'whole wheat', 120], ['Bajra Roti', 'pearl millet', 170], ['Jowar Roti', 'sorghum flour', 160], ['Kerala Pathiri', 'rice flour', 150], ['Akki Roti', 'rice flour with onion & dill', 190]].forEach(function (b) {
    var south = /Malabar|Pathiri|Akki|Jowar/.test(b[0]);
    var fried = /Bhatura|Puri/.test(b[0]);
    add({ name: b[0], diet: /naan|kulcha|bhatura/i.test(b[0]) ? 'veg' : 'vegan', region: south ? 'south' : 'north', cats: [south ? 'south' : 'north', 'bread'], kcal: b[2], flav: fried ? 'Puffy · Crisp' : 'Soft · Warm', serves: 2,
      ing: [I('2 cups', 'flour (' + b[1] + ')'), I('', 'salt & water'), I('2 tbsp', /naan|kulcha|bhatura/i.test(b[0]) ? 'butter or ghee' : 'oil')],
      steps: [S('knead', 'Make a soft dough with the flour (' + b[1] + '), salt and water.', 6), S('rest', 'Cover and rest the dough ' + (/naan|kulcha|bhatura/i.test(b[0]) ? '2 hours to rise.' : '20 minutes.'), 20), S('roll', 'Divide into balls and roll out evenly.', 4), fried ? S('fry', 'Deep-fry in hot oil, pressing gently so it puffs up.', 6) : S('fry', 'Cook on a very hot tawa (or tandoor), then flip onto an open flame to puff.', 6), S('serve', 'Brush with butter or ghee and serve warm.', 1)],
      art: { kind: fried ? 'puri' : 'bread', base: '#dcaa62' } });
  });

  // ------------------------------------------------------------------ rice & biryani
  var BIRY = [['Hyderabadi Dum', 'south', 'saffron, mint, fried onions — layered and sealed on dum'], ['Lucknowi', 'north', 'mild, fragrant, cooked in yakhni stock'], ['Kolkata', 'north', 'with potato & a hint of sweetness'], ['Ambur', 'south', 'seeraga samba rice with red chilli paste'], ['Dindigul', 'south', 'jeeraga samba rice with pepper'], ['Malabar', 'south', 'kaima rice with cashews & raisins'], ['Chettinad', 'south', 'fiery Chettinad masala'], ['Donne', 'south', 'green masala of mint & coriander'], ['Mughlai', 'north', 'rich with nuts and cream'], ['Bombay', 'north', 'with potatoes & prunes'], ['Andhra', 'south', 'extra spicy with green chillies'], ['Thalassery', 'south', 'ghee-rich, mildly spiced']];
  var BPRO = [['Chicken', 'nonveg', '500 g chicken, marinated', 330], ['Mutton', 'nonveg', '500 g mutton, marinated', 380], ['Egg', 'egg', '6 boiled eggs, fried with masala', 300], ['Veg', 'veg', '3 cups mixed vegetables', 260], ['Paneer', 'veg', '250 g paneer, marinated', 330], ['Prawn', 'nonveg', '400 g prawns, marinated', 300], ['Fish', 'nonveg', '500 g fish, marinated', 300], ['Mushroom', 'veg', '250 g mushrooms', 250], ['Soya', 'vegan', '1½ cups soya chunks', 270]];
  BIRY.forEach(function (b, bi) {
    BPRO.forEach(function (p, pi) {
      if ((bi + pi) % 3 === 2 && pi > 1) return;           // not every style has every version
      if (p[0] === 'Soya' && bi > 3) return;
      var nm = (p[0] === 'Veg' ? 'Veg ' : p[0] + ' ') + b[0] + ' Biryani';
      if (b[0] === 'Hyderabadi Dum') nm = 'Hyderabadi ' + (p[0] === 'Veg' ? 'Veg' : p[0]) + ' Dum Biryani';
      var diet = p[1] === 'vegan' ? 'vegan' : p[1];
      add({ name: nm, diet: diet, region: b[1], cats: [b[1], 'rice', 'biryani', p[0] === 'Paneer' ? 'paneer' : '', p[0] === 'Egg' ? 'eggs' : ''], kcal: p[3] + 120, flav: /Chettinad|Andhra|Ambur/.test(b[0]) ? 'Spicy · Aromatic' : 'Aromatic · Rich', serves: 4, level: 'Chef level',
        ing: [I('2 cups', /Ambur|Dindigul/.test(b[0]) ? 'seeraga samba rice' : /Malabar|Thalassery/.test(b[0]) ? 'kaima rice' : 'aged basmati rice'), I('', p[2]), I('½ cup', diet === 'vegan' ? 'coconut yogurt' : 'curd'), I('2', 'onions, thinly sliced & fried golden'), I('½ cup', 'mint & coriander leaves'), I('2 tbsp', 'biryani masala'), I('1 tbsp', 'ginger-garlic paste'), I('3 tbsp', diet === 'vegan' ? 'oil' : 'ghee'), I('pinch', 'saffron in 3 tbsp warm milk'), I('', 'whole spices: bay leaf, cardamom, cloves, cinnamon, star anise')].map(function (x) { return diet === 'vegan' ? I(x.q, veganize(x.item)) : x; }),
        steps: [S('boil', 'Soak the rice 30 minutes.', 5), S('marinate', 'Marinate the ' + p[0].toLowerCase() + ' with curd, ginger-garlic paste, biryani masala, half the fried onions, mint and salt.', 30), S('boil', 'Boil the rice in salted water with whole spices until 70% cooked; drain.', 8),
          S('saute', 'Cook the marinated ' + p[0].toLowerCase() + ' in ghee until the masala is thick' + (p[0] === 'Mutton' ? ' (pressure-cook mutton first).' : '.'), p[0] === 'Mutton' ? 30 : 15), S('add', 'Layer the rice over the masala; top with fried onions, mint, saffron milk and ghee.', 3), S('steam', 'Seal the pot and cook on dum over low heat for 20 minutes — ' + b[2] + '.', 20), S('serve', 'Rest 5 minutes, gently mix from the side and serve with raita and salan.', 2)],
        art: { kind: 'biryani', base: '#e3a33b', piece: p[0] === 'Egg' ? 'egg' : p[0] === 'Paneer' ? 'cube' : p[0] === 'Prawn' ? 'prawn' : /Veg|Mushroom|Soya/.test(p[0]) ? 'veg' : 'chunk', pc: p[0] === 'Paneer' ? '#f7ecd0' : '#b56a33' } });
    });
  });
  var RICE = [
    ['Lemon Rice', 'south', 'vegan', 'lemon juice, peanuts, turmeric & curry leaves', '#f2cf45'], ['Tamarind Rice (Puliyogare)', 'south', 'vegan', 'tangy tamarind paste & roasted peanuts', '#8a5022'], ['Coconut Rice', 'south', 'vegan', 'fresh coconut, cashews & curry leaves', '#f4efdc'],
    ['Curd Rice', 'south', 'veg', 'curd, milk, tempered with mustard, ginger & pomegranate', '#f7f3e6'], ['Tomato Rice', 'south', 'vegan', 'tomato masala', '#d4552c'], ['Mint Rice', 'south', 'vegan', 'mint & coriander paste', '#6fae4a'], ['Bisi Bele Bath', 'south', 'veg', 'rice, toor dal, vegetables & bisi bele masala', '#b8562a'],
    ['Vangi Bath', 'south', 'vegan', 'brinjal & vangi bath masala', '#80503a'], ['Ghee Rice', 'south', 'veg', 'ghee, whole spices, fried onions & cashews', '#f1dfae'], ['Jeera Rice', 'north', 'veg', 'cumin & ghee', '#f2e6c4'], ['Veg Pulao', 'north', 'veg', 'mixed vegetables & whole spices', '#e3c77e'],
    ['Peas Pulao', 'north', 'veg', 'green peas & whole spices', '#dbe3a0'], ['Kashmiri Pulao', 'north', 'veg', 'saffron, dry fruits & fruits', '#f3cf73'], ['Paneer Pulao', 'north', 'veg', 'paneer cubes & peas', '#f1dd9a'], ['Chicken Pulao', 'north', 'nonveg', 'chicken cooked with whole spices', '#dcb472'],
    ['Mutton Pulao', 'north', 'nonveg', 'mutton yakhni stock', '#caa061'], ['Egg Pulao', 'south', 'egg', 'boiled eggs & mild masala', '#e9cf82'], ['Masala Khichdi', 'north', 'veg', 'rice, moong dal & vegetables', '#e3be5c'], ['Dal Khichdi', 'north', 'veg', 'rice, moong dal & ghee tadka', '#ecd07c'], ['Bagara Rice', 'south', 'veg', 'Hyderabadi spiced rice', '#eedcae'],
    ['Pudina Pulao', 'north', 'vegan', 'mint & whole spices', '#9cc46a'], ['Capsicum Rice', 'south', 'vegan', 'capsicum & vangi bath powder', '#7fb04a'], ['Coriander Rice', 'south', 'vegan', 'coriander paste', '#5aa24a'], ['Sesame Rice (Ellu Sadam)', 'south', 'vegan', 'roasted sesame powder', '#b9955e'], ['Pongal Rice Kheer', 'south', 'veg', 'milk & jaggery', '#e8c283']
  ];
  RICE.forEach(function (r) {
    add({ name: r[0], diet: r[2], region: r[1], cats: [r[1], 'rice', /Paneer/.test(r[0]) ? 'paneer' : '', r[2] === 'egg' ? 'eggs' : ''], kcal: r[2] === 'nonveg' ? 420 : 330, flav: /Lemon|Tamarind|Tomato|Vangi/.test(r[0]) ? 'Tangy · Spiced' : /Curd/.test(r[0]) ? 'Cool · Soothing' : 'Fragrant · Mild', serves: 3,
      ing: [I('1½ cups', 'rice (cooked & cooled for tempered rice)'), I('', r[3]), I('2 tbsp', r[2] === 'vegan' ? 'oil' : 'ghee'), I('1 tsp', 'mustard or cumin seeds'), I('1 sprig', 'curry leaves'), I('2', 'green chillies'), I('', 'salt')],
      steps: /Pulao|Khichdi|Bath|Bagara|Ghee Rice|Jeera/.test(r[0]) ? [S('boil', 'Wash and soak the rice 20 minutes.', 5), S('fry', 'Fry the whole spices / tempering in ' + (r[2] === 'vegan' ? 'oil' : 'ghee') + '.', 2), S('saute', 'Sauté onions and add ' + r[3] + '.', 8), S('add', 'Add the rice with double the water and salt.', 2), S('pressure', 'Cook covered (or 2 whistles) until fluffy.', 15), S('serve', 'Fluff with a fork and serve with raita.', 1)]
        : [S('boil', 'Cook the rice so every grain is separate; spread to cool.', 15), S('fry', 'Temper mustard, dals, chillies and curry leaves in ' + (r[2] === 'vegan' ? 'oil' : 'ghee') + '.', 3), S('add', 'Add ' + r[3] + '.', 3), S('stir', 'Fold in the rice gently with salt until evenly coated.', 3), S('serve', 'Serve with papad and pickle — perfect for lunch boxes.', 1)],
      art: { kind: 'rice', base: r[4] } });
  });
  // fried rice & noodles (Indo-Chinese)
  [['Veg', 'vegan', 'mixed veggies'], ['Egg', 'egg', 'scrambled eggs'], ['Chicken', 'nonveg', 'shredded chicken'], ['Paneer', 'veg', 'paneer cubes'], ['Prawn', 'nonveg', 'prawns'], ['Mushroom', 'vegan', 'mushrooms'], ['Schezwan Veg', 'vegan', 'schezwan sauce & veggies'], ['Schezwan Chicken', 'nonveg', 'schezwan sauce & chicken'], ['Mixed', 'nonveg', 'chicken, egg & prawns'], ['Burnt Garlic', 'vegan', 'crispy burnt garlic']].forEach(function (f) {
    ['Fried Rice', 'Hakka Noodles'].forEach(function (base, bi) {
      if (bi && /Burnt/.test(f[0])) return;
      add({ name: f[0] + ' ' + base, diet: f[1], region: 'chinese', cats: ['fast', 'chinese', bi ? 'noodles' : 'rice', f[0] === 'Paneer' ? 'paneer' : '', f[1] === 'egg' ? 'eggs' : ''], kcal: f[1] === 'nonveg' ? 430 : 360, flav: /Schezwan/.test(f[0]) ? 'Spicy · Garlicky' : 'Savoury · Smoky', serves: 2,
        ing: [I(bi ? '200 g' : '2 cups', bi ? 'hakka noodles, boiled' : 'cooked rice (a day old is best)'), I('', f[2]), I('1 cup', 'cabbage, carrot, capsicum & spring onion, shredded'), I('1 tbsp', 'garlic, chopped'), I('1 tbsp', 'soy sauce'), I('1 tsp', 'vinegar'), I('½ tsp', 'white pepper'), I('2 tbsp', 'oil')],
        steps: [S('chop', 'Shred the vegetables finely and keep everything ready — this cooks fast.', 6), S('fry', 'Heat oil in a wok until smoking; fry the garlic 20 seconds.', 1), S('fry', 'Add ' + f[2] + ' and stir-fry on high.', 3), S('fry', 'Toss in the vegetables for 1 minute — keep them crunchy.', 1), S('add', 'Add the ' + (bi ? 'noodles' : 'rice') + ', soy sauce, vinegar, pepper and salt.', 1), S('stir', 'Toss everything on high heat for 2 minutes for that smoky wok flavour.', 2), S('garnish', 'Top with spring onion greens and serve hot.', 1)],
        art: { kind: bi ? 'noodles' : 'rice', base: bi ? '#d9a95a' : '#e9d6a0', mix: true } });
    });
  });
})(typeof window !== 'undefined' ? window : globalThis);
