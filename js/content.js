const DIMENSIONS = [
  'Confidence under pressure',
  'Bouncing back after setbacks',
  'Staying focused in the moment',
  'Quality of your self-talk',
  'Confidence going into training or competition',
  'Clarity on who you are as an athlete',
  'Handling mistakes during performance',
  'Showing up consistently even when you don\'t feel like it',
  'Belief that you can genuinely improve',
  'Confidence when being watched, selected, or judged'
];

const MIDPOINT_INDICES = [0, 1, 4, 6, 7];

const CONTENT = [

  // WEEK 1
  {
    phase: 'PHASE 1',
    title: 'CONVICTION OVER CONFIDENCE',
    tag: 'Decide before you feel ready.',
    note: 'Most athletes wait to feel confident before they act. That\'s the trap. Confidence is a feeling \u2014 it comes and goes. Conviction is a decision \u2014 it stays. This week we decide who you are as an athlete before the game tells you. Build your conviction statement. Make it yours.',
    focus: 'Build your conviction statement. Who are you as an athlete \u2014 not what you can do, but who you are?',
    action: 'Write your conviction statement in the Tools tab. Read it every morning this week before you train or compete.',
    quote: '\u201CYou don\u2019t need to feel ready. You need to decide. Those are two very different things.\u201D',
    sheasTake: 'I spent years waiting to feel confident enough. It never came that way. Conviction did. There\u2019s a difference \u2014 and this week you\u2019ll start to feel it.',
    prompts: [
      'What kind of athlete do you choose to be, regardless of results?',
      'What would you do today if confidence wasn\'t required?',
      'Who are you when no one\'s watching?',
      'What does conviction look like for you in your next session?',
      'Write one sentence that captures who you are as an athlete.',
      'When have you acted without feeling ready? What happened?',
      'Read your conviction statement. Does it feel true? Adjust it if needed.',
    ]
  },

  // WEEK 2
  {
    phase: 'PHASE 1',
    title: 'CONVICTION OVER CONFIDENCE',
    tag: 'Own it. Use it. Every single day.',
    note: 'You\'ve got a conviction statement. Now we test it. This week is about using it \u2014 before training, before the hard moment, when you want to switch off. Conviction only works when you actually reach for it. The athletes who get this right use it like a tool, not a prayer.',
    focus: 'Apply your conviction statement daily. Before training, before hard moments, before you want to pull back.',
    action: 'Say your conviction statement out loud before every session this week. Then journal how it felt.',
    quote: '\u201CA conviction you don\u2019t use is just words. Reach for it this week.\u201D',
    sheasTake: 'The athletes I\'ve coached who made the biggest breakthroughs all had one thing in common \u2014 they used their conviction statement before they felt like it. Not when they felt ready. Before.',
    prompts: [
      'Did you use your conviction statement today? When?',
      'When did you need your conviction and didn\'t reach for it?',
      'How does your conviction feel when things get hard?',
      'Is your conviction statement still accurate? Refine it if needed.',
      'One situation this week where your conviction helped you stay in it?',
      'On a scale of 1\u201310, how convinced are you of your conviction right now?',
      'What would a fully convicted version of you do differently tomorrow?',
    ]
  },

  // WEEK 3
  {
    phase: 'PHASE 2',
    title: 'PROGRESS OVER PERFECT',
    tag: 'Ship. Log. Repeat.',
    note: 'You\'ve been waiting to be perfect before you act. That stops this week. Perfect is a lie that keeps you stuck. Imperfect action \u2014 logged, repeated, owned \u2014 is how belief gets built. Start adding to your evidence file. Every rep, no matter how small.',
    focus: 'Log one rep each day \u2014 one thing you showed up for, even imperfectly. The quality doesn\'t matter. The showing up does.',
    action: 'Add one piece of evidence to your file every day this week. One thing you did. No excuses.',
    quote: '\u201CYou don\u2019t get ready. You get going. Then you get ready.\u201D',
    sheasTake: '320 caps didn\'t come from waiting until I was perfect. They came from showing up when I was a long way from it. Log the rep. That\'s the whole game.',
    prompts: [
      'What did you show up for today, even though it wasn\'t perfect?',
      'Where are you making progress you\'re not giving yourself credit for?',
      'What imperfect thing did you do today that still counted?',
      'Where are you letting perfect stop you from starting?',
      'One rep today \u2014 what was it?',
      'What does "progress over perfect" mean in your sport specifically?',
      'Three imperfect things you did this week that still mattered.',
    ]
  },

  // WEEK 4
  {
    phase: 'PHASE 2',
    title: 'PROGRESS OVER PERFECT',
    tag: 'Build momentum through action.',
    note: 'By now you should have real evidence. Things you actually did. This week we look at it \u2014 because you can\'t feel your way to belief, but you can look back and see it was already there. Open your evidence file. Read every entry. Notice what\'s building.',
    focus: 'Review your evidence file. Notice the pattern of someone who shows up.',
    action: 'Add evidence AND read back your last three entries every day this week. Let it build the case for you.',
    quote: '\u201CYour evidence file is building a case for you. Read it. Believe it.\u201D',
    sheasTake: 'Halfway through Phase 2. Look at your evidence file. That\'s not luck. That\'s you \u2014 showing up repeatedly when it would have been easier not to. That\'s real.',
    prompts: [
      'Look at your evidence file. What pattern do you see?',
      'Which piece of evidence surprised you most?',
      'One thing you did this week you would have quit on 4 weeks ago?',
      'Where is momentum building, even if it\'s small?',
      'What does your evidence file tell you about who you are?',
      'What would someone confident do tomorrow \u2014 could you do that today?',
      'Progress check: how are you different from Week 1?',
    ]
  },

  // WEEK 5
  {
    phase: 'PHASE 3',
    title: 'STRIVE WHEN IT\'S GOING WRONG',
    tag: 'Turn up louder, not quieter.',
    note: 'Most athletes shrink when it goes wrong. They go quiet, get small, disappear from the contest. This week we build your Storm Playbook. The storm is coming \u2014 it always does. You need a protocol, not a prayer. Build your Signal \u2192 Anchor \u2192 Action.',
    focus: 'Identify your biggest triggers and start building your Storm Playbook in the Tools tab.',
    action: 'Build your Storm Playbook this week. Make it specific. Your real trigger, your real anchor, your real action.',
    quote: '\u201CThe storm isn\u2019t the problem. Not having a plan for the storm \u2014 that\u2019s the problem.\u201D',
    sheasTake: 'I\'ve played 320 international games. The storm came in every single one. What separated the athletes who performed from those who didn\'t was a protocol. Build yours this week.',
    prompts: [
      'What\'s your biggest trigger \u2014 the thing that makes you want to quit?',
      'What does "going wrong" look like for you specifically?',
      'When you shrink, what\'s the signal? What do you notice first?',
      'What\'s your anchor? (Your conviction, a word, a breath \u2014 what brings you back?)',
      'What\'s the smallest action you can take when things go wrong?',
      'A time you turned up louder when it was hard. What did that take?',
      'Build or review your Storm Playbook. Does it feel real and usable?',
    ]
  },

  // WEEK 6
  {
    phase: 'PHASE 3',
    title: 'STRIVE WHEN IT\'S GOING WRONG',
    tag: 'The playbook only works if you use it.',
    note: 'The playbook is useless if it stays in the app. This week, you need to notice the moment \u2014 the signal \u2014 and run your protocol. It will feel artificial at first. Do it anyway. Athletes who survive the hard moments do so because they practiced the protocol before they needed it.',
    focus: 'Apply the Storm Playbook in real situations this week. Notice the signal and run the protocol.',
    action: 'Every time something goes wrong this week \u2014 or could have \u2014 note it in your journal. Did you use the playbook?',
    quote: '\u201CYou don\u2019t rise to the occasion. You fall to the level of your preparation.\u201D',
    sheasTake: 'The first time you use your Storm Playbook in a real moment, it will feel wrong. Too deliberate. Too slow. Use it anyway. The second time it feels better. By the tenth time, it\u2019s automatic.',
    prompts: [
      'Did you experience a setback this week? What happened?',
      'Did you use your Storm Playbook? If not, what stopped you?',
      'What does your anchor actually feel like to use in the moment?',
      'When you wanted to quit this week, what did you do?',
      'One moment you turned up louder when you could have gone quiet?',
      'How has your Storm Playbook changed since you first wrote it?',
      'Rate your stormproofing this week 1\u201310. What would 10 look like?',
    ]
  },

  // WEEK 7
  {
    phase: 'PHASE 4',
    title: 'STOP SEARCHING FOR BELIEF',
    tag: 'Action \u2192 evidence \u2192 belief.',
    note: 'You\'ve been waiting for belief to arrive. It doesn\'t work like that. Belief is the last thing to show up \u2014 after action, after evidence. Open your evidence file right now. Read every single entry. That is your belief, already built. You just haven\'t looked at it properly yet.',
    focus: 'Build the evidence \u2192 belief connection. Stop looking for the feeling \u2014 look at the proof.',
    action: 'Review your full evidence file every day this week. Add to it. Let the file do the work your feelings won\'t.',
    quote: '\u201CYou\u2019re already doing it. You\u2019re just not seeing it. Open the file. Read it.\u201D',
    sheasTake: 'Belief isn\'t a feeling that arrives. It\'s a conclusion you reach after looking at the evidence. You\'ve been building that evidence for 7 weeks. Time to read the case.',
    prompts: [
      'What does your evidence file tell you that your feelings don\'t?',
      'When have you trusted evidence over feelings this week?',
      'Where is your belief strongest right now? Why there?',
      'Where are you still waiting for belief instead of building it?',
      'What would you have to believe to do the hard thing tomorrow?',
      'Read your conviction and evidence file back to back. What do you notice?',
      'What action today becomes evidence tomorrow?',
    ]
  },

  // WEEK 8
  {
    phase: 'PHASE 4',
    title: 'STOP SEARCHING FOR BELIEF',
    tag: 'Own what you\'ve built. Fully.',
    note: 'You\'re more than halfway. Look back at Week 1. You\'re different \u2014 not because you\'ve been given something, but because you\'ve built something. This week is about owning that. Fully. Without waiting for permission from results or other people.',
    focus: 'Take stock. Write a midpoint reflection. Who were you in Week 1 vs now?',
    action: 'Write a proper midpoint reflection in your journal this week. Be honest. What\'s actually changed?',
    quote: '\u201CNobody hands you belief. You earn it. And you have.\u201D',
    sheasTake: 'Eight weeks in. You\'ve done the work that most athletes never do. The question now is \u2014 do you own it? Or are you still waiting for someone else to tell you it counts?',
    prompts: [
      'Who were you in Week 1 vs who you are now?',
      'What\'s the biggest shift in how you show up?',
      'Where are you still reverting to old patterns? What triggers it?',
      'What do you now know about yourself that you didn\'t before?',
      'What piece of evidence are you most proud of from the last 8 weeks?',
      'What would you tell the Week 1 version of yourself?',
      'Where is belief showing up in your actual performance?',
    ]
  },

  // WEEK 9
  {
    phase: 'PHASE 5',
    title: 'STAY WHERE YOUR FEET ARE',
    tag: 'Presence is a skill. Build it.',
    note: 'Your mind goes everywhere when things get hard \u2014 past mistakes, future fears. This week we bring it back. To here. To now. To the only moment that actually exists. Presence isn\'t a personality trait. It\'s a practice. Start the grounding check every day this week.',
    focus: 'Learn and practice the grounding check: feel your feet, take three breaths, name one thing you control.',
    action: '60 seconds every day before training: feet on the floor, three slow breaths, one thing you can control right now.',
    quote: '\u201CThe only place the game is played is right here. Not in your head. Here.\u201D',
    sheasTake: 'The best players I\'ve ever been on a field with weren\'t the most talented. They were the most present. They played the ball that was actually in front of them \u2014 not the one they missed last week or feared next week.',
    prompts: [
      'Where does your mind go when things get hard?',
      'What pulls you out of the present moment most often?',
      'Did you do your grounding check today? What did you notice?',
      'In what situation this week did you need presence the most?',
      'What does "staying where your feet are" look like for you specifically?',
      'When you were present today, how did you perform differently?',
      'What\'s one cue that helps you come back to the present moment?',
    ]
  },

  // WEEK 10
  {
    phase: 'PHASE 5',
    title: 'STAY WHERE YOUR FEET ARE',
    tag: 'Your playbook for the rest of your career.',
    note: 'This is the last week. But it\'s not the end \u2014 it\'s the beginning of how you operate from here. This week we write your Belief Letter. Everything you\'ve learned, built, and proved about yourself goes into it. This is yours. For the hard days. For the rest of your career.',
    focus: 'Write your Belief Letter. Complete the programme. Own every single thing you\'ve built.',
    action: 'Open the Belief Letter in the Tools tab and write it this week. Add to it each day. This is the final step.',
    quote: '\u201CYou showed up for 10 weeks. That\u2019s not nothing. That\u2019s everything.\u201D',
    sheasTake: '10 weeks ago you started this because you were struggling with belief. Today you\u2019re writing a letter to yourself that will serve you for the rest of your athletic career. That\'s the programme. That\'s the work.',
    prompts: [
      'What\'s the most important thing you\'ve learned about yourself in 10 weeks?',
      'What habit do you commit to carrying forward?',
      'What would you tell a younger athlete about belief?',
      'Complete your Belief Letter: who are you as an athlete now?',
      'What\'s your conviction statement after 10 weeks? Has it evolved?',
      'What\'s your commitment for the next season?',
      'It\'s been 10 weeks. What are you most proud of?',
    ]
  }

];
