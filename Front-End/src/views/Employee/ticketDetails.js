/*
{
  details: [
    {{#repeat 10}}
    {
      detailID: {{ faker 'random.number' min=10000 max=100000 }},
      userID: {{ faker 'random.number' min=10000 max=100000 }},
      userTitle: '{{ oneOf (array 'Admin' 'Tech' 'Customer' ) }}',
      userFullName: '{{ faker 'name.firstName' }} {{ faker 'name.lastName' }}',
      detail: '{{ faker 'lorem.paragraph' }}',
    },
    {{/repeat}}
  ],
}
mockon data
*/

const data = {
  ticketDetails: [
    {
      detailID: 35935,
      userID: 85650,
      userTitle: 'Tech',
      userFullName: 'Clare Hane',
      detail:
        'Laboriosam unde eveniet natus qui sint possimus veniam ut blanditiis. Culpa nulla ab autem ducimus optio fugiat architecto eligendi. Occaecati deleniti ut dicta corrupti corporis animi. Velit sint aut reprehenderit sit at iusto eligendi dolor maxime. Error aut dolor quo placeat ut ut perspiciatis. Laboriosam sint veritatis molestias.',
    },
    {
      detailID: 17869,
      userID: 63531,
      userTitle: 'Tech',
      userFullName: 'Alfonso Ledner',
      detail:
        'Dolor saepe et voluptate molestiae laborum nisi eos asperiores. Consequuntur ipsum perferendis qui maiores perspiciatis. Occaecati aut minima. Sit non pariatur nisi et saepe omnis dolorum. Doloremque occaecati magnam earum. Dolorem temporibus beatae est quas in distinctio iste molestias.',
    },
    {
      detailID: 77865,
      userID: 77725,
      userTitle: 'Tech',
      userFullName: 'Mac OHara',
      detail:
        'Et excepturi ut mollitia dolores aperiam. Ut corrupti est illum blanditiis laboriosam nam. Eum animi aut minima doloribus. In aspernatur vel ipsum impedit quae temporibus impedit.',
    },
    {
      detailID: 68540,
      userID: 28419,
      userTitle: 'Customer',
      userFullName: 'Elmo Morissette',
      detail:
        'Veniam et quia delectus qui. Id laudantium consequuntur vitae consequuntur eius quidem facere blanditiis. Aliquid at laboriosam. Rerum repudiandae voluptate.',
    },
    {
      detailID: 50352,
      userID: 15311,
      userTitle: 'Admin',
      userFullName: 'Zula Ferry',
      detail:
        'Odit aliquam non dolorem magni. Facilis et illum vero eaque voluptas aut. Et illum dolor. Aperiam qui doloremque dolore nihil perspiciatis non.',
    },
    {
      detailID: 92900,
      userID: 73570,
      userTitle: 'Admin',
      userFullName: 'Glennie Emard',
      detail:
        'Et odio sapiente. Similique aut temporibus quod cumque molestias consequatur recusandae inventore. Minima nisi laboriosam eveniet. Cupiditate esse nesciunt quis laudantium quam velit molestiae.',
    },
    {
      detailID: 91847,
      userID: 40315,
      userTitle: 'Admin',
      userFullName: 'Domenico Flatley',
      detail:
        'Eum soluta eos ullam sunt enim cumque fuga vel eum. Corporis autem deserunt et non nihil dolor in molestiae. Nulla totam consequatur temporibus. Consequatur quia assumenda aliquam ut in asperiores repellat impedit corrupti.',
    },
    {
      detailID: 29460,
      userID: 18497,
      userTitle: 'Admin',
      userFullName: 'Abigale Lockman',
      detail:
        'Sunt dolorum quod. Tempora optio ipsam qui iure asperiores. Deserunt odit architecto. Non aut quis quod perspiciatis alias repellat minima molestias minima.',
    },
    {
      detailID: 79762,
      userID: 72102,
      userTitle: 'Admin',
      userFullName: 'Willy Kohler',
      detail:
        'Id quibusdam ut nihil accusantium. Illum saepe explicabo in ad in quis commodi assumenda reiciendis. Velit a et possimus veniam et eveniet. Est nulla dolorum in nihil similique molestias et excepturi.',
    },
    {
      detailID: 22021,
      userID: 14256,
      userTitle: 'Tech',
      userFullName: 'Clara Cummerata',
      detail:
        'Pariatur cupiditate fugit placeat sit omnis et perspiciatis in cum. Iure rerum quis nostrum alias architecto. Quis dolores rem fuga error veritatis. Ut dolor laboriosam itaque voluptatem nulla dolorem. Et eum voluptas eius inventore consequatur explicabo atque.',
    },
  ],
};

export default data;
