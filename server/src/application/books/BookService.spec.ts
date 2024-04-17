import { Test, TestingModule } from '@nestjs/testing';
import { IBookRepository } from '../..//domain/books/repositories/IBookRepository';
import { BookService } from './BookService';

describe('BookService', () => {
  let service: BookService;

  const BOOKS = [
    {
      id: 1,
      code: 'M001',
      title: 'Harry Potter',
      author: 'Harry Potter',
      stock: 1,
      createdAt: '2024-04-17T12:37:40.522Z',
      updatedAt: '2024-04-17T12:37:40.522Z',
    },
  ];

  const BookRepositoryMock = {
    find: jest.fn().mockResolvedValue(BOOKS),
    getAvailableBooks: jest.fn().mockResolvedValue(BOOKS),
    findOneById: jest.fn().mockResolvedValue(BOOKS[0]),
    decreaseBookStock: jest.fn(),
    increaseBookStock: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: IBookRepository,
          useValue: BookRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  describe('findAll', () => {
    it('Should return books', async () => {
      const result = await service.findAll();
      expect(result).toStrictEqual(BOOKS);
    });
  });

  describe('getAvailableBooks', () => {
    it('Should return books', async () => {
      const result = await service.getAvailableBooks();
      expect(result).toStrictEqual(BOOKS);
    });
  });

  describe('findOneById', () => {
    it('Should return books', async () => {
      const result = await service.findOneById(1);
      expect(result).toStrictEqual(BOOKS[0]);
    });
  });

  describe('decreaseBookStock', () => {
    it('Should return nothing as it void', async () => {
      const result = await service.decreaseBookStock(1);
      expect(result).not.toBeDefined();
    });
  });

  describe('increaseBookStock', () => {
    it('Should return nothing as it void', async () => {
      const result = await service.increaseBookStock(1);
      expect(result).not.toBeDefined();
    });
  });
});
