import { Section } from '../types';

export const sections: Section[] = [
  {
    id: 'past-year',
    title: 'Past Year Reflection (2024)',
    categories: [
      {
        id: 'overall',
        title: 'Overall',
        questions: [
          {
            id: 'best-thing',
            text: 'What was the single best thing that happened this past year?'
          },
          {
            id: 'achievements',
            text: 'What were my most notable "achievements", experiences, memories, or things that happened to me this past year?'
          },
          {
            id: 'grateful',
            text: 'What are some things about this past year that I feel truly grateful for?'
          },
          {
            id: 'challenge',
            text: 'What was the single most challenging thing that happened? What were your lessons from it? Did you overcome it and how?'
          },
          {
            id: 'three-words',
            text: 'Pick three words to describe this past year.'
          },
          {
            id: 'new-beliefs',
            text: 'What beliefs do I hold now that I didn\'t hold a year ago?'
          },
          {
            id: 'new-skills',
            text: 'What new skills did I develop/improve last year?'
          },
          {
            id: 'fulfillment',
            text: 'In what moments did I feel most fulfilled independent of external impact or perception?'
          },
          {
            id: 'helping-others',
            text: 'What are the best ways you helped others this past year? These could be family, friends, community, or strangers.'
          }
        ]
      },
      {
        id: 'favorite-things',
        title: 'Favorite Things',
        questions: [
          {
            id: 'books',
            text: 'What were your favorite books you read this year?'
          },
          {
            id: 'relationships',
            text: 'Who were your most valuable relationships with?'
          },
          {
            id: 'entertainment',
            text: 'Favorite movies or shows that you greatly enjoyed?'
          },
          {
            id: 'places',
            text: 'Favorite places you visited locally or elsewhere?'
          },
          {
            id: 'advice',
            text: 'Best advice you have received this year and how it affected you.'
          },
          {
            id: 'influential-people',
            text: 'Who were the top most influential people in your life?'
          },
          {
            id: 'nicest-thing',
            text: 'What was the nicest thing you did for someone?'
          }
        ]
      },
      {
        id: 'change-growth',
        title: 'Change and Growth',
        questions: [
          {
            id: 'biggest-change',
            text: 'What was your biggest personal change from January to December of this past year?'
          },
          {
            id: 'positive-changes',
            text: 'What other positive changes have occurred in my life in the past year that I\'m most grateful for?'
          },
          {
            id: 'lessons',
            text: 'What are the biggest lessons you learned this past year?'
          },
          {
            id: 'emotional-growth',
            text: 'In what way(s) did you grow emotionally?'
          },
          {
            id: 'spiritual-growth',
            text: 'In what way(s) did you grow spiritually?'
          },
          {
            id: 'physical-growth',
            text: 'In what way(s) did you grow physically?'
          },
          {
            id: 'risks',
            text: 'What risks have I taken that I\'m glad I took?'
          },
          {
            id: 'self-learning',
            text: 'What have I learned about myself, how I work, and what I need to be at my best?'
          },
          {
            id: 'comfort-zone',
            text: 'When was a time where you stepped out of your comfort zone?'
          },
          {
            id: 'turning-points',
            text: 'Did you notice any particular turning points in your personal development? When and what?'
          }
        ]
      },
      {
        id: 'professional',
        title: 'Professional',
        questions: [
          {
            id: 'work-enjoyable',
            text: 'What was the most enjoyable part of your work (both professionally and at home)?'
          },
          {
            id: 'work-challenging',
            text: 'What was the most challenging part of your work (both professionally and at home)?'
          },
          {
            id: 'time-usage',
            text: 'What was the best way you used your time this past year?'
          },
          {
            id: 'career-satisfaction',
            text: 'Are you satisfied with where your career is headed?'
          },
          {
            id: 'education-career',
            text: 'Do you feel like you\'re on the right track with your education/career?'
          },
          {
            id: 'side-projects',
            text: 'Did you start or take on a new business, side project, or career path?'
          },
          {
            id: 'time-management',
            text: 'How good were you at time management?'
          }
        ]
      },
      {
        id: 'relationships',
        title: 'Relationships',
        questions: [
          {
            id: 'friend-circle',
            text: 'What did your friend circle look like this year? Are you satisfied with it?'
          },
          {
            id: 'love-life',
            text: 'Describe how your love life or romantic relationship(s) went.'
          },
          {
            id: 'time-with-others',
            text: 'Were you happy with how much time you spent with friends and family?'
          }
        ]
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle and Habits',
        questions: [
          {
            id: 'sleep',
            text: 'On average, how was your sleep? Often have trouble sleeping?'
          },
          {
            id: 'therapy',
            text: 'Did you go to therapy? In what ways did it help you most?'
          },
          {
            id: 'self-love',
            text: 'In what ways, no matter how small, did you accomplish self-love?'
          },
          {
            id: 'bad-habits',
            text: 'Which bad habits would you like to let go of?'
          },
          {
            id: 'alone-time',
            text: 'How much "alone time" did you spend with yourself?'
          }
        ]
      },
      {
        id: 'experiences',
        title: 'Experiences and Adventures',
        questions: [
          {
            id: 'travel',
            text: 'Did you travel anywhere you enjoyed?'
          },
          {
            id: 'creativity',
            text: 'What was the most creative thing you did this year?'
          },
          {
            id: 'adventure',
            text: 'What was your favorite adventure you had this year?'
          }
        ]
      },
      {
        id: 'challenges',
        title: 'Challenges and Stress',
        questions: [
          {
            id: 'overwhelm',
            text: 'In what ways were you most overwhelmed this year?'
          },
          {
            id: 'stress',
            text: 'What was your number one source of stress?'
          },
          {
            id: 'unfulfilled',
            text: 'What did you want to do, but didn\'t?'
          },
          {
            id: 'missing',
            text: 'Did it feel like there was something missing this past year?'
          }
        ]
      },
      {
        id: 'financial',
        title: 'Financial',
        questions: [
          {
            id: 'budget',
            text: 'Did you create a budget and stick to it?'
          },
          {
            id: 'money-waste',
            text: 'What did you waste too much money on?'
          }
        ]
      },
      {
        id: 'overall-assessment',
        title: 'Overall Assessment',
        questions: [
          {
            id: 'happiness-pattern',
            text: 'Was there a recurring theme or pattern of something that made you happy?'
          },
          {
            id: 'year-rating',
            text: 'How would you rate this past year on a scale of 1-10? Why?'
          }
        ]
      }
    ],
  },
  {
    id: 'new-year',
    title: 'New Year Planning (2025)',
    categories: [
      {
        id: 'guiding-principles',
        title: 'Guiding Principles and Goals',
        questions: [
          {
            id: 'principles',
            text: 'What guiding principles, truths, and values will guide my journey over the next year?'
          },
          {
            id: 'improvement',
            text: 'What is the #1 way in which you could improve your life next year compared to this year?'
          },
          {
            id: 'dream',
            text: 'What\'s something I\'ve always dreamed of doing but haven\'t done yet? Can I make this dream come true this year?'
          },
          {
            id: 'more-of',
            text: 'What do I need or want more of in my life? How can I make space for more of this in the next year?'
          },
          {
            id: 'bucket-list',
            text: 'What\'s on my lifelong bucket list? Which of these things could I do or accomplish over the next year?'
          }
        ]
      },
      {
        id: 'health-wellbeing',
        title: 'Health and Well-Being',
        questions: [
          {
            id: 'five-minutes',
            text: 'What\'s one thing I can do in five minutes a day to support my body, mind, and spirit?'
          },
          {
            id: 'routine-changes',
            text: 'Are there any changes to my routine in my personal/professional life that I want to incorporate this year?'
          },
          {
            id: 'health-system',
            text: 'What system can or will you put in place to dramatically improve your physical and mental health?'
          },
          {
            id: 'financial-health',
            text: 'What changes can you make to improve your financial health and outcomes? Were there any mistakes you want to avoid this year?'
          }
        ]
      },
      {
        id: 'courage-risk',
        title: 'Courage and Risk-Taking',
        questions: [
          {
            id: 'worth-failing',
            text: 'What\'s still worth doing for me, even if I might fail?'
          },
          {
            id: 'fears',
            text: 'Are you afraid of or concerned about anything for next year? Are there any belief changes, actions, or external help you can seek to overcome these?'
          }
        ]
      },
      {
        id: 'helping-others',
        title: 'Helping Others',
        questions: [
          {
            id: 'enrich-others',
            text: 'Are there ways you can enrich others\' lives this year? This could be for family, friends, community, or strangers.'
          }
        ]
      }
    ]
  }
];