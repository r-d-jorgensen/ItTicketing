// TODO: Remove this file

// generated using https://mockoon.com/ (API using faker.js)
/* mockoon body response recipe
{
  "tickets": [
    {{# repeat (queryParam 'total' '10') }}
      {
        "id": "{{ faker 'random.number' min=10000 max=100000 }}",
        "created": "{{ faker 'date.recent' }}",
        "title": "{{ faker 'lorem.words' }}",
        "body": "{{ faker 'lorem.paragraph' }}",
        "closed": "{{ faker 'random.boolean' }}",
        "assigned": [
          {{# repeat (faker 'random.number' min=1 max=4) }}
            {
              "id": "{{ faker 'random.uuid' }}"
            }
          {{/ repeat }}
        ]
      },
    {{/ repeat }}
  ],
  "total": "{{queryParam 'total' '10'}}"
}
*/

/* eslint-disable */
const data = {
  "tickets": [
      {
        "id": "18080",
        "created": "Thu Mar 18 2021 03:03:03 GMT-0700 (Pacific Daylight Time)",
        "title": "perferendis magnam non",
        "body": "Recusandae ducimus officia aut. Quia consequatur autem est dolor aut consequatur voluptate. Similique laborum id ut omnis harum laudantium voluptatem asperiores. Odit possimus quidem ducimus. Velit hic aperiam iste veniam saepe voluptas. Aperiam error quisquam voluptate saepe.",
        "closed": "false",
        "assigned": [
            {
              "id": "a12aed5f-03c2-4804-8b54-0387950d96f6"
            },
            {
              "id": "5254a1d7-527f-4849-b829-3f25872682b8"
            },
            {
              "id": "bd0969f5-4f8c-4a24-b7a2-6c6a4fbe3102"
            }
        ]
      },
      {
        "id": "80083",
        "created": "Wed Mar 17 2021 22:05:20 GMT-0700 (Pacific Daylight Time)",
        "title": "perferendis iusto suscipit",
        "body": "Est itaque voluptates cum distinctio. Itaque quis consequatur possimus ut vero maxime. Deleniti rerum illo animi expedita autem repellat minima saepe inventore.",
        "closed": "false",
        "assigned": [
            {
              "id": "c12aa85d-c8c7-4c1a-ada2-e38ba54145ac"
            },
            {
              "id": "228baf61-ba7b-4faa-8e22-27c5938be3b0"
            },
            {
              "id": "e0b73838-3b2e-463e-8bcc-d505cac05956"
            }
        ]
      },
      {
        "id": "31706",
        "created": "Thu Mar 18 2021 16:45:13 GMT-0700 (Pacific Daylight Time)",
        "title": "ipsam tempore eveniet",
        "body": "Aut laudantium tenetur libero asperiores laborum esse voluptatum. Velit corporis cumque soluta ullam sequi culpa veritatis dicta adipisci. Inventore sint accusamus eum impedit.",
        "closed": "true",
        "assigned": [
            {
              "id": "b0361917-8cef-425f-9977-f69e70686dfe"
            },
            {
              "id": "96bf9cb3-3ef8-4eda-beb5-43e739253c49"
            },
            {
              "id": "25b2d9b4-8284-4da2-b324-2017122a1b58"
            }
        ]
      },
      {
        "id": "99948",
        "created": "Thu Mar 18 2021 02:02:33 GMT-0700 (Pacific Daylight Time)",
        "title": "esse voluptas nihil",
        "body": "Necessitatibus doloremque aut et dolores dolor. Libero nisi maxime incidunt itaque. Eos ea alias doloremque placeat magni laudantium ea laborum. Nemo quibusdam totam. Minima quaerat et aperiam perspiciatis officia qui excepturi quia accusamus. Aut tenetur id architecto libero molestias laudantium voluptatum.",
        "closed": "false",
        "assigned": [
            {
              "id": "5393d5a4-b578-4e24-8bab-73194bd7549d"
            },
            {
              "id": "aff1aee0-84f6-49d9-9191-ed2347dd699f"
            },
            {
              "id": "95ecac81-99eb-4f69-8bd5-27a1dd7a8232"
            }
        ]
      },
      {
        "id": "67957",
        "created": "Thu Mar 18 2021 00:45:02 GMT-0700 (Pacific Daylight Time)",
        "title": "exercitationem in pariatur",
        "body": "Quos enim deserunt nisi odio et natus rerum alias. Veritatis et natus molestias amet. Repellendus occaecati rem quia a sint ea. In earum qui aut numquam sint minima est. Placeat perferendis placeat rerum velit veritatis enim. Qui dolores iusto quo et.",
        "closed": "true",
        "assigned": [
            {
              "id": "bd407a41-5fc8-4950-baeb-fc0307f35d2f"
            },
            {
              "id": "e9b12c68-71bb-4381-8e00-88da2a471435"
            },
            {
              "id": "85243969-8e8f-4bed-9b48-a7c999e091b1"
            }
        ]
      },
      {
        "id": "35449",
        "created": "Wed Mar 17 2021 22:52:23 GMT-0700 (Pacific Daylight Time)",
        "title": "eum qui commodi",
        "body": "Vitae modi neque ipsum. Id vitae cupiditate est velit qui. In recusandae velit quisquam. Eum quidem quo numquam et ipsum quis iste dignissimos labore.",
        "closed": "true",
        "assigned": [
            {
              "id": "8265282f-2ed7-4826-9389-28d7d0d519d2"
            },
            {
              "id": "b2b70cf4-bedd-49e4-a711-1e66510a7ca9"
            }
        ]
      },
      {
        "id": "61221",
        "created": "Thu Mar 18 2021 01:40:47 GMT-0700 (Pacific Daylight Time)",
        "title": "adipisci consequatur et",
        "body": "Dignissimos eum natus nisi nisi odio aspernatur laboriosam placeat. Molestiae ducimus nobis est ut expedita eum. Illum vel iusto iure qui quas. Dolor odit laudantium exercitationem molestiae omnis vel impedit ut. Facilis voluptatem et optio provident ipsam dolorem velit. Qui ut illum dolorem et qui et.",
        "closed": "false",
        "assigned": [
            {
              "id": "02b7c67b-68d3-4bec-8c5f-c7d8a2780541"
            },
            {
              "id": "b260aca4-7590-434e-92ef-d99f2479348e"
            },
            {
              "id": "4249300e-7ab8-42e0-ae1e-6baa7e740815"
            },
            {
              "id": "52fa56b0-96d4-442c-ac0d-5227f0ef0930"
            }
        ]
      },
      {
        "id": "69503",
        "created": "Thu Mar 18 2021 00:43:48 GMT-0700 (Pacific Daylight Time)",
        "title": "placeat unde nihil",
        "body": "Possimus qui consequuntur excepturi commodi placeat delectus non cumque atque. Sit eaque natus incidunt voluptas deleniti et in. Unde sint molestiae sequi est quas neque et ipsam.",
        "closed": "true",
        "assigned": [
            {
              "id": "8be0a4cd-e05b-4717-a037-bda7ac3b758f"
            }
        ]
      },
      {
        "id": "22451",
        "created": "Thu Mar 18 2021 15:00:26 GMT-0700 (Pacific Daylight Time)",
        "title": "ut incidunt saepe",
        "body": "Iste autem tenetur neque pariatur. Et ullam molestiae sed qui architecto repellat aut. Facere est ut soluta quas voluptas consequatur asperiores aut. Neque sunt natus omnis et dolorum deleniti quo rem rerum.",
        "closed": "false",
        "assigned": [
            {
              "id": "3ca61a03-8c70-475b-ba4c-f35031c5ef93"
            },
            {
              "id": "11eb3328-0653-441a-93bb-afce082d6f63"
            },
            {
              "id": "5922f1e7-0858-476c-b5fb-a0cc9c3700af"
            }
        ]
      },
      {
        "id": "72531",
        "created": "Thu Mar 18 2021 05:06:27 GMT-0700 (Pacific Daylight Time)",
        "title": "ea non necessitatibus",
        "body": "Officiis in animi nemo sed fuga. Rerum corrupti blanditiis autem illo ut aut quia eos libero. Consectetur quo debitis blanditiis. Delectus nulla voluptate totam.",
        "closed": "false",
        "assigned": [
            {
              "id": "3fe1b1ce-d440-49e0-95fe-b9d99d47591c"
            }
        ]
      }
  ],
  "total": "10"
};

export default data;
