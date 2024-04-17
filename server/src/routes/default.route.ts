import { BooksModule } from '../infrastructure/books/modules/books.module';
import { MembersModule } from '../infrastructure/members/modules/members.module';

export const internalRoutes = [
  {
    path: '/api',
    children: [
      {
        path: '/members',
        module: MembersModule,
      },
      {
        path: '/books',
        module: BooksModule,
      },
    ],
  },
];
