/*
{
  tickets: [
    {{#repeat 50}}
    {
      ticketID: {{ faker 'random.number' min=10000 max=100000 }},
      ticketOwner: '{{ faker 'name.firstName' }} {{ faker 'name.lastName' }}',
      company: '{{ faker 'company.bs' }}',
      title: '{{ faker 'lorem.words' }}',
      priority: '{{ oneOf (array 'Low' 'Mid' 'High' 'Urgent' ) }}',
      details: {
        userID: {{ faker 'random.number' min=10000 max=100000 }},
        userTitle: '{{ oneOf (array 'Admin' 'Tech' 'Customer' ) }}',
        userFullName: '{{ faker 'name.firstName' }} {{ faker 'name.lastName' }}',
        detail: '{{ faker 'lorem.paragraph' }}',
      },
    },
    {{/repeat}}
  ],
}
mockon data
*/

const data = {
  tickets: [
    {
      ticketID: 27152,
      ticketOwner: 'Skylar Rippin',
      company: 'synergize holistic platforms',
      title: 'odio hic excepturi',
      priority: 'Urgent',
      details: {
        userID: 91736,
        userTitle: 'Tech',
        userFullName: 'Bertha Batz',
        detail:
          'Consectetur sunt laboriosam aliquam animi impedit repellat nam modi. Possimus quam consectetur quia qui nam. Sed rerum molestiae enim et eaque. Neque deleniti incidunt et. Adipisci assumenda inventore eos enim.',
      },
    },
    {
      ticketID: 49156,
      ticketOwner: 'Henri Legros',
      company: 'synthesize cross-media mindshare',
      title: 'sit odit dolor',
      priority: 'Mid',
      details: {
        userID: 14351,
        userTitle: 'Admin',
        userFullName: 'Elmo Cormier',
        detail:
          'Sunt ut non hic illum voluptatem recusandae repudiandae id sint. Quam facilis commodi. Rem voluptatum sed rerum occaecati.',
      },
    },
    {
      ticketID: 65127,
      ticketOwner: 'Hosea Schultz',
      company: 'iterate transparent methodologies',
      title: 'accusamus ipsa iure',
      priority: 'Urgent',
      details: {
        userID: 56503,
        userTitle: 'Customer',
        userFullName: 'Mossie Rolfson',
        detail:
          'Dolore voluptatem dignissimos. Labore sed quia in doloribus esse sit in voluptates. Voluptatibus quod quaerat et dolorem veniam quia fuga tenetur expedita. Eligendi praesentium vel et.',
      },
    },
    {
      ticketID: 31048,
      ticketOwner: 'Monique Swift',
      company: 'transform 24/365 convergence',
      title: 'soluta accusamus illo',
      priority: 'Mid',
      details: {
        userID: 73803,
        userTitle: 'Admin',
        userFullName: 'Victoria Lehner',
        detail:
          'Et maiores enim cum sequi neque dolores voluptatem aliquid voluptate. Ipsa sit assumenda. Aut vel nostrum voluptas id eveniet.',
      },
    },
    {
      ticketID: 60236,
      ticketOwner: 'Brielle Emmerich',
      company: 'architect sexy e-tailers',
      title: 'repellendus repudiandae nulla',
      priority: 'Mid',
      details: {
        userID: 29262,
        userTitle: 'Customer',
        userFullName: 'Darien Steuber',
        detail:
          'Eius enim expedita maiores maxime veniam explicabo. Possimus qui tenetur magnam minus. Neque consectetur fugiat quod.',
      },
    },
    {
      ticketID: 46957,
      ticketOwner: 'Pansy Smitham',
      company: 'embrace dot-com communities',
      title: 'dolor quod ea',
      priority: 'Mid',
      details: {
        userID: 51247,
        userTitle: 'Admin',
        userFullName: 'Diamond Rowe',
        detail:
          'Officiis laudantium sit velit eum ut eligendi voluptatem a officia. Quo similique exercitationem impedit est et quo officiis deserunt. Rerum explicabo officia culpa velit quasi. Aliquid quia vitae expedita tenetur sequi quaerat similique aut fuga.',
      },
    },
    {
      ticketID: 38068,
      ticketOwner: 'Carolyne Shields',
      company: 'enhance transparent models',
      title: 'et corporis voluptatem',
      priority: 'Mid',
      details: {
        userID: 26722,
        userTitle: 'Tech',
        userFullName: 'Olin Larson',
        detail:
          'Voluptatum assumenda ut aperiam quo est. Aut eum vero eum laudantium sed placeat assumenda. Rerum numquam repudiandae quia ea praesentium dolore sint.',
      },
    },
    {
      ticketID: 29947,
      ticketOwner: 'Raven Schmidt',
      company: 'architect front-end partnerships',
      title: 'qui quod harum',
      priority: 'High',
      details: {
        userID: 66969,
        userTitle: 'Customer',
        userFullName: 'Coy Kiehn',
        detail:
          'Rem illum voluptatem placeat rerum. Ipsum numquam assumenda ut autem. Sed enim totam dolor eum inventore vitae. Vero corporis deserunt aut amet ut dignissimos. Modi delectus omnis minus non sint praesentium voluptatem aut. Deserunt sit quos accusantium veritatis quae enim.',
      },
    },
    {
      ticketID: 92955,
      ticketOwner: 'Yasmin Medhurst',
      company: 'iterate bleeding-edge deliverables',
      title: 'ad et qui',
      priority: 'Low',
      details: {
        userID: 52849,
        userTitle: 'Admin',
        userFullName: 'Lavern Goldner',
        detail:
          'Aut omnis et ullam fugiat velit sed expedita assumenda autem. Rerum iste exercitationem doloremque dolores. Dolorem aut ea iure natus quasi dolores sint. Aut nihil nihil veniam illum repudiandae soluta.',
      },
    },
    {
      ticketID: 41344,
      ticketOwner: 'Deondre Feeney',
      company: 'enable dot-com applications',
      title: 'sed aut enim',
      priority: 'High',
      details: {
        userID: 53337,
        userTitle: 'Customer',
        userFullName: 'Tyrique McGlynn',
        detail:
          'Fugit atque molestiae molestiae voluptatem neque. Est et officiis animi ut quidem. Iusto quis rerum et veritatis velit in doloremque reprehenderit ipsum.',
      },
    },
    {
      ticketID: 89476,
      ticketOwner: 'Felicita Vandervort',
      company: 'synthesize innovative deliverables',
      title: 'illo labore accusamus',
      priority: 'Mid',
      details: {
        userID: 40588,
        userTitle: 'Admin',
        userFullName: 'Webster Goodwin',
        detail:
          'Accusamus aliquid soluta quibusdam dolorum perspiciatis. Molestiae excepturi aut sed. Quia sed quisquam. Sequi rerum facilis. Dolorem aut eaque laudantium autem qui voluptatibus. Mollitia in voluptatem et tenetur corrupti perspiciatis sapiente.',
      },
    },
    {
      ticketID: 18828,
      ticketOwner: 'Jamey Breitenberg',
      company: 'integrate leading-edge interfaces',
      title: 'in minus dolores',
      priority: 'Low',
      details: {
        userID: 70087,
        userTitle: 'Tech',
        userFullName: 'Alexane Spinka',
        detail:
          'Quibusdam ut qui aut illo impedit dolores. Non ipsum tenetur nostrum mollitia enim magnam. Saepe sed maxime eos voluptatem. Voluptate et aut et beatae velit ipsum hic inventore qui.',
      },
    },
    {
      ticketID: 82787,
      ticketOwner: 'Antonetta Hauck',
      company: 'aggregate bleeding-edge systems',
      title: 'nesciunt placeat magni',
      priority: 'High',
      details: {
        userID: 46272,
        userTitle: 'Tech',
        userFullName: 'Magnus Flatley',
        detail:
          'Dolor in dolorum quo voluptas voluptas adipisci ducimus quibusdam. Rerum quia asperiores architecto reprehenderit ut. Laudantium reiciendis possimus vel quos id odit ea rem. Non blanditiis ex consequatur tempore velit qui.',
      },
    },
    {
      ticketID: 42182,
      ticketOwner: 'Dianna Grant',
      company: 'embrace synergistic channels',
      title: 'iure eum magni',
      priority: 'Low',
      details: {
        userID: 18544,
        userTitle: 'Customer',
        userFullName: 'Jeanette Sporer',
        detail:
          'Modi dignissimos minus exercitationem autem ab. Recusandae animi maxime voluptatum maxime laudantium. Quaerat architecto tempora. Accusantium eum minus. Laboriosam est aut in exercitationem.',
      },
    },
    {
      ticketID: 40676,
      ticketOwner: 'Schuyler McKenzie',
      company: 'maximize proactive vortals',
      title: 'dicta doloribus hic',
      priority: 'Low',
      details: {
        userID: 34814,
        userTitle: 'Customer',
        userFullName: 'Breanne Schoen',
        detail:
          'Natus id eveniet sed neque. Quod reiciendis soluta quia deserunt veritatis at et consequatur. Et blanditiis consequatur. Quae consectetur aut et sed voluptatum odio repellat. Sunt doloremque rem et esse.',
      },
    },
    {
      ticketID: 19270,
      ticketOwner: 'Letitia Corkery',
      company: 'scale killer e-tailers',
      title: 'nisi exercitationem et',
      priority: 'Mid',
      details: {
        userID: 65442,
        userTitle: 'Customer',
        userFullName: 'Nichole Reichert',
        detail:
          'Nostrum officiis non. Cumque quia in eos quibusdam qui voluptas fugiat quia. Ipsum ullam at qui culpa perferendis voluptatem officia recusandae. Consequatur non deleniti recusandae sunt soluta commodi doloribus. Excepturi omnis ab.',
      },
    },
    {
      ticketID: 21152,
      ticketOwner: 'Audreanne Beer',
      company: 'evolve sexy convergence',
      title: 'cupiditate harum veritatis',
      priority: 'High',
      details: {
        userID: 24370,
        userTitle: 'Admin',
        userFullName: 'Minnie Ruecker',
        detail:
          'Dolorem hic sit autem est nihil id magni quia culpa. Veniam possimus vel commodi deserunt culpa dolore facilis. Qui at eos qui temporibus cumque id eligendi.',
      },
    },
    {
      ticketID: 57321,
      ticketOwner: 'Salvador Walter',
      company: 'harness plug-and-play architectures',
      title: 'rem esse quia',
      priority: 'High',
      details: {
        userID: 99469,
        userTitle: 'Customer',
        userFullName: 'Raleigh Beahan',
        detail:
          'In ut dignissimos doloribus et commodi architecto. Similique itaque expedita aut excepturi nam soluta. Quos ipsam non amet ut et totam dolorum dolorem perspiciatis. Rerum molestiae quibusdam aut tempore enim suscipit. Nam ad non quos qui nisi.',
      },
    },
    {
      ticketID: 16986,
      ticketOwner: 'Leila Langosh',
      company: 'envisioneer scalable e-markets',
      title: 'rerum vel repellat',
      priority: 'Low',
      details: {
        userID: 47002,
        userTitle: 'Tech',
        userFullName: 'Emilio Schaden',
        detail:
          'Et voluptatem vel voluptatibus commodi doloremque vitae. In hic excepturi optio sed sunt. Nesciunt reprehenderit eos iure suscipit.',
      },
    },
    {
      ticketID: 81297,
      ticketOwner: 'Keyshawn Kub',
      company: 'drive sticky action-items',
      title: 'sed eaque tenetur',
      priority: 'Urgent',
      details: {
        userID: 95935,
        userTitle: 'Tech',
        userFullName: 'Felton Effertz',
        detail:
          'Assumenda beatae necessitatibus eius velit debitis. Culpa labore et minima aut ab impedit eaque nemo deserunt. Modi reiciendis ipsam in quia nulla. Laborum repudiandae est amet ducimus.',
      },
    },
    {
      ticketID: 61911,
      ticketOwner: 'Felton OHara',
      company: 'redefine clicks-and-mortar paradigms',
      title: 'exercitationem libero fugit',
      priority: 'High',
      details: {
        userID: 32990,
        userTitle: 'Admin',
        userFullName: 'Shawna Kessler',
        detail:
          'Ut rerum quia sed maiores dolores animi ipsa eum animi. Maiores aut eveniet eligendi. Provident rerum ut explicabo nostrum. Autem in ad quas officia adipisci dignissimos est.',
      },
    },
    {
      ticketID: 32687,
      ticketOwner: 'Garnett Heaney',
      company: 'e-enable cross-media initiatives',
      title: 'animi voluptatem recusandae',
      priority: 'High',
      details: {
        userID: 24845,
        userTitle: 'Customer',
        userFullName: 'Lionel Rath',
        detail:
          'Repellendus nesciunt eum quaerat et. Et laboriosam vitae ea corrupti nobis ut. Earum in reprehenderit ea repellat rem quidem sunt.',
      },
    },
    {
      ticketID: 96212,
      ticketOwner: 'Amie Altenwerth',
      company: 'reintermediate 24/7 convergence',
      title: 'eius voluptas ducimus',
      priority: 'Mid',
      details: {
        userID: 24995,
        userTitle: 'Tech',
        userFullName: 'Roderick Wiegand',
        detail:
          'Repellat vero nihil sed. Doloremque sit nesciunt ratione et quia. Qui molestiae voluptas corrupti quia est itaque aut placeat.',
      },
    },
    {
      ticketID: 11068,
      ticketOwner: 'Alphonso Braun',
      company: 'facilitate user-centric technologies',
      title: 'aut sunt quis',
      priority: 'Urgent',
      details: {
        userID: 76025,
        userTitle: 'Admin',
        userFullName: 'Litzy Deckow',
        detail:
          'Voluptatibus itaque alias laboriosam voluptas voluptas nostrum nihil. A quasi consectetur a. Aut officia ratione. Deleniti omnis explicabo mollitia et corporis dignissimos magni ut et. Similique earum officiis esse et magnam non ut rerum. Dolore ut modi est quasi eum rem aut vero distinctio.',
      },
    },
    {
      ticketID: 38533,
      ticketOwner: 'Cyril Klein',
      company: 'reintermediate 24/365 synergies',
      title: 'dignissimos et enim',
      priority: 'Low',
      details: {
        userID: 66030,
        userTitle: 'Customer',
        userFullName: 'Delphia Corwin',
        detail:
          'Et corrupti quia officia saepe aut mollitia nam omnis ut. Officiis et quos nulla officiis aliquam nemo. Quod consequatur est ducimus. Cumque voluptas natus aut omnis.',
      },
    },
    {
      ticketID: 71318,
      ticketOwner: 'Molly Veum',
      company: 'deploy leading-edge paradigms',
      title: 'maxime natus perferendis',
      priority: 'Urgent',
      details: {
        userID: 28834,
        userTitle: 'Customer',
        userFullName: 'Armando Gutmann',
        detail:
          'Dolor repellendus earum laborum possimus. Mollitia id veniam totam sint repellendus eligendi officiis labore. Quidem beatae quia voluptas sed.',
      },
    },
    {
      ticketID: 96832,
      ticketOwner: 'Pasquale Wiegand',
      company: 'visualize end-to-end users',
      title: 'vel totam praesentium',
      priority: 'Low',
      details: {
        userID: 36616,
        userTitle: 'Customer',
        userFullName: 'Chandler Harvey',
        detail:
          'Laboriosam tenetur nisi aut eos voluptatum animi explicabo assumenda. Tempora ut illum mollitia sequi quod expedita doloribus est dolorum. Sunt error aut.',
      },
    },
    {
      ticketID: 14058,
      ticketOwner: 'Arden Waters',
      company: 'e-enable strategic eyeballs',
      title: 'accusantium eligendi voluptate',
      priority: 'Urgent',
      details: {
        userID: 59425,
        userTitle: 'Customer',
        userFullName: 'Melba McDermott',
        detail:
          'Id laboriosam omnis impedit. Corrupti aperiam repellendus molestiae voluptatem. Deleniti incidunt possimus. Pariatur voluptatem quibusdam omnis.',
      },
    },
    {
      ticketID: 63144,
      ticketOwner: 'Albina Turner',
      company: 'unleash rich web services',
      title: 'iste mollitia voluptatem',
      priority: 'Mid',
      details: {
        userID: 80203,
        userTitle: 'Customer',
        userFullName: 'Carmel Schultz',
        detail:
          'Magnam nulla quia eligendi ut culpa. Quasi aut maiores est molestias quasi et. Ut omnis quia nulla dignissimos distinctio beatae fuga architecto. Ea ipsum repellendus fugiat quam. Provident ut illum sunt quibusdam enim totam possimus beatae vero.',
      },
    },
    {
      ticketID: 48270,
      ticketOwner: 'Mittie Cummerata',
      company: 'innovate 24/7 applications',
      title: 'voluptas velit earum',
      priority: 'Urgent',
      details: {
        userID: 72828,
        userTitle: 'Customer',
        userFullName: 'Casimer Kovacek',
        detail:
          'Numquam quas et quia mollitia illo officiis hic nihil. Sequi praesentium iure. Est distinctio id aliquid maxime omnis est. Vel saepe quia sit nisi omnis eligendi velit et quam. Consequuntur illo corporis similique.',
      },
    },
    {
      ticketID: 12090,
      ticketOwner: 'Michele Cronin',
      company: 'embrace customized methodologies',
      title: 'at alias corrupti',
      priority: 'High',
      details: {
        userID: 41784,
        userTitle: 'Customer',
        userFullName: 'Ashtyn Heaney',
        detail:
          'Aliquam animi eligendi vel quis eaque. Quo molestiae labore aut earum ullam. Sed nihil voluptas. Est iure eum. Aut reprehenderit impedit.',
      },
    },
    {
      ticketID: 43135,
      ticketOwner: 'Janis Lind',
      company: 'empower next-generation eyeballs',
      title: 'in ex tenetur',
      priority: 'Low',
      details: {
        userID: 26351,
        userTitle: 'Customer',
        userFullName: 'Leanne Stanton',
        detail:
          'Placeat dolores ipsum culpa aliquid consequuntur enim voluptatem esse minima. Quasi est quisquam fugit non quisquam animi consequatur sunt omnis. Ut qui ut aut beatae minus voluptatem ut aspernatur beatae. Consequuntur ut magnam dolorem et. Quos eos et. Fugiat temporibus quis blanditiis consequuntur.',
      },
    },
    {
      ticketID: 10222,
      ticketOwner: 'Luther Bernier',
      company: 'utilize rich convergence',
      title: 'sint distinctio enim',
      priority: 'Mid',
      details: {
        userID: 15636,
        userTitle: 'Tech',
        userFullName: 'Isac Lebsack',
        detail:
          'Voluptates quae fuga rerum eligendi. Doloremque expedita praesentium consequatur. Molestiae ut ipsa accusantium aut omnis ex dolores magnam. Vitae possimus sunt sed vel. Distinctio qui dignissimos ab aut suscipit voluptatem ea consectetur. Voluptas iure tempora quia perferendis tempore.',
      },
    },
    {
      ticketID: 96965,
      ticketOwner: 'Guiseppe Johnson',
      company: 'implement value-added communities',
      title: 'tempore laboriosam explicabo',
      priority: 'Urgent',
      details: {
        userID: 89096,
        userTitle: 'Customer',
        userFullName: 'Gretchen Torphy',
        detail:
          'Quam recusandae rerum. Doloremque aut animi nesciunt rerum delectus. Vitae eius qui minima omnis pariatur iste accusantium. Quo et ipsa. Voluptate repellendus facilis non quas deleniti dolor quo quia. Molestiae pariatur est.',
      },
    },
    {
      ticketID: 69829,
      ticketOwner: 'Dimitri Mann',
      company: 'enhance e-business eyeballs',
      title: 'culpa rem mollitia',
      priority: 'Mid',
      details: {
        userID: 92542,
        userTitle: 'Customer',
        userFullName: 'Nya Hansen',
        detail:
          'Autem nihil delectus velit iusto ad ab sint similique fuga. Est quo vel quisquam fuga. Aut consequuntur ut consequuntur magnam aliquam quidem blanditiis dolorem ipsa.',
      },
    },
    {
      ticketID: 80779,
      ticketOwner: 'Virgie Fisher',
      company: 'innovate collaborative e-business',
      title: 'iusto voluptatem labore',
      priority: 'Low',
      details: {
        userID: 97396,
        userTitle: 'Customer',
        userFullName: 'Jazlyn Witting',
        detail:
          'Dolorem non eum corporis pariatur exercitationem exercitationem et architecto. Aut qui sit laborum vel nihil dolor dolores sequi. Rerum aut omnis qui minima neque praesentium aut. Omnis distinctio adipisci dolor voluptatem. Inventore error et sit in. Consequatur voluptatem velit sunt.',
      },
    },
    {
      ticketID: 85520,
      ticketOwner: 'Darwin Jast',
      company: 'cultivate viral eyeballs',
      title: 'accusantium non et',
      priority: 'Mid',
      details: {
        userID: 25384,
        userTitle: 'Tech',
        userFullName: 'Evert Pfannerstill',
        detail:
          'Omnis eligendi eos. Culpa ut et nobis. Magnam non praesentium saepe nobis occaecati minima magnam.',
      },
    },
    {
      ticketID: 63348,
      ticketOwner: 'Donny Dickens',
      company: 'orchestrate value-added schemas',
      title: 'dolor molestiae occaecati',
      priority: 'Mid',
      details: {
        userID: 52928,
        userTitle: 'Customer',
        userFullName: 'Kennith Johns',
        detail:
          'Unde quos aliquid et. Cupiditate maiores natus necessitatibus facilis nesciunt libero non sit. Quia sequi porro vitae quasi aut. Et tempore corrupti est fuga et est ab.',
      },
    },
    {
      ticketID: 58547,
      ticketOwner: 'Everette Zboncak',
      company: 'mesh plug-and-play e-markets',
      title: 'sit repudiandae facere',
      priority: 'Urgent',
      details: {
        userID: 56954,
        userTitle: 'Tech',
        userFullName: 'Amira Upton',
        detail:
          'Consequatur illum est quia id tempore quia voluptatum repellat ullam. Illum aut voluptatem quia eum a. Vitae sed doloribus et tempore. Sint cumque maxime rem.',
      },
    },
    {
      ticketID: 83340,
      ticketOwner: 'Curt Upton',
      company: 'deliver value-added e-tailers',
      title: 'excepturi sapiente vitae',
      priority: 'High',
      details: {
        userID: 23743,
        userTitle: 'Tech',
        userFullName: 'August Carter',
        detail:
          'Animi eveniet illo. Rerum numquam odit vel tenetur nihil. Iure fuga ullam mollitia animi impedit molestiae nulla. Qui et asperiores vero exercitationem.',
      },
    },
    {
      ticketID: 92876,
      ticketOwner: 'Mozell Oberbrunner',
      company: 'grow innovative e-services',
      title: 'fugiat facere et',
      priority: 'High',
      details: {
        userID: 29466,
        userTitle: 'Admin',
        userFullName: 'Monica Gislason',
        detail:
          'Commodi quo dolorem quae voluptate quia sunt dolorem. Ut eum reiciendis voluptas reprehenderit consequuntur. Ea iste deleniti incidunt. Aliquam dolor saepe autem at aliquid labore ea est. Qui aut voluptatum quaerat.',
      },
    },
    {
      ticketID: 31012,
      ticketOwner: 'Josie Schaefer',
      company: 'engineer user-centric relationships',
      title: 'sunt repudiandae vel',
      priority: 'High',
      details: {
        userID: 83498,
        userTitle: 'Customer',
        userFullName: 'Kelton Ward',
        detail:
          'Doloribus sequi debitis cupiditate voluptatem consectetur. Suscipit mollitia dolorum mollitia autem occaecati voluptas ut at iure. Et natus quis qui blanditiis fugiat. Occaecati tenetur et ea similique aut.',
      },
    },
    {
      ticketID: 37859,
      ticketOwner: 'Maria Reynolds',
      company: 'strategize transparent synergies',
      title: 'sint eaque quaerat',
      priority: 'High',
      details: {
        userID: 49769,
        userTitle: 'Admin',
        userFullName: 'Derrick Champlin',
        detail:
          'Quidem vero doloribus corporis ducimus id eum. Voluptas possimus molestiae. Qui commodi voluptatem minus. Nemo voluptatem illo. Deserunt itaque nemo deleniti sed quibusdam in non molestiae.',
      },
    },
    {
      ticketID: 12431,
      ticketOwner: 'Ulices Haley',
      company: 'enable scalable partnerships',
      title: 'quo beatae porro',
      priority: 'Mid',
      details: {
        userID: 61857,
        userTitle: 'Tech',
        userFullName: 'Waino Koepp',
        detail:
          'Autem dolores minima totam quia. Omnis omnis consequatur eum necessitatibus sunt voluptas omnis cum. Voluptatem et perspiciatis ratione velit nam. Quia fuga rerum autem ullam neque.',
      },
    },
    {
      ticketID: 41321,
      ticketOwner: 'Oceane Wuckert',
      company: 'syndicate mission-critical e-business',
      title: 'molestias sit eos',
      priority: 'Mid',
      details: {
        userID: 99261,
        userTitle: 'Tech',
        userFullName: 'Michael Runolfsson',
        detail:
          'Voluptatum veniam vitae quia perspiciatis deserunt voluptates sit. Odio quod vero amet aut commodi. Impedit ut accusamus ipsa.',
      },
    },
    {
      ticketID: 57099,
      ticketOwner: 'Woodrow Barrows',
      company: 'disintermediate granular infomediaries',
      title: 'a neque nostrum',
      priority: 'High',
      details: {
        userID: 53547,
        userTitle: 'Customer',
        userFullName: 'Lydia Steuber',
        detail:
          'Voluptas delectus magni repellendus. Voluptatum libero explicabo commodi eligendi cupiditate. Dicta repellat non provident quod eaque est tempora.',
      },
    },
    {
      ticketID: 77499,
      ticketOwner: 'Barrett Veum',
      company: 'mesh intuitive solutions',
      title: 'harum libero distinctio',
      priority: 'Low',
      details: {
        userID: 20606,
        userTitle: 'Admin',
        userFullName: 'Ezequiel Pfeffer',
        detail:
          'Dolor et tempora et ducimus est distinctio. Est voluptas aspernatur consectetur quo error quis aperiam. Tempore possimus sint. Consequatur distinctio est aliquid iusto soluta. Culpa facere sint nemo quas.',
      },
    },
    {
      ticketID: 94962,
      ticketOwner: 'Devante Stroman',
      company: 'scale granular schemas',
      title: 'corrupti doloremque ipsa',
      priority: 'High',
      details: {
        userID: 79862,
        userTitle: 'Customer',
        userFullName: 'Sammy Roberts',
        detail:
          'Incidunt rem odio eaque. Magnam fuga exercitationem omnis. Rem non quibusdam voluptatem praesentium. Minima perferendis amet.',
      },
    },
    {
      ticketID: 84889,
      ticketOwner: 'Winfield Pfannerstill',
      company: 'cultivate cross-platform e-commerce',
      title: 'facere dolorum rem',
      priority: 'High',
      details: {
        userID: 97039,
        userTitle: 'Tech',
        userFullName: 'Dominique Beer',
        detail:
          'Dolores et fugiat nam non voluptates et. Quis dolorem nulla possimus quia. Occaecati vero quo. Error at temporibus unde.',
      },
    },
    {
      ticketID: 96451,
      ticketOwner: 'Freddie Orn',
      company: 'expedite compelling deliverables',
      title: 'odit illo necessitatibus',
      priority: 'Low',
      details: {
        userID: 29483,
        userTitle: 'Admin',
        userFullName: 'Concepcion Dickinson',
        detail:
          'Maiores voluptatem ea repellat. Sint delectus beatae ad repellendus qui sunt est excepturi sunt. Nesciunt cupiditate est ab et velit ad iure velit cumque.',
      },
    },
  ],
};

export default data;
