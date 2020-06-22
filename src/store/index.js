const services = [
  {
    id: 'ad0bcf4c',
    user: 'user_id_1',
    category: 'programming',
    title: 'I will teach you Programming fast!',
    description: "I'm teaching C++, C#, JS ...",
    price: 10, //per hour
    image:
      'https://images.unsplash.com/photo-1587691592099-24045742c181?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
  },
  {
    id: '1cdf36c9',
    user: 'user_id_2',
    category: 'mathematics',
    title: 'I will teach you math fast!',
    description:
      "I'm teaching highschool mathematics, algebra, triogometry. I can teach you anything.",
    price: 10, //per hour
    image:
      'https://images.unsplash.com/photo-1576834967753-ad2cf1cc8d19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1396&q=80',
  },
]

export const getServices = () => services
