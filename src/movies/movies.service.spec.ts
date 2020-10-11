import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from '@nestjs/common';

describe('MoviesService', () => {
  let service: MoviesService;
  const testDto = {
    title: 'test',
    year: 2020,
    genres: ['test'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return movie type array', () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return movie by id', () => {
      service.create(testDto);
      expect(service.getOne(1)).toBeDefined();
    });

    it('should throw 404 error', () => {
      try {
        service.getOne(10000);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove movie by id', () => {
      service.create(testDto);
      service.remove(1);
      expect(service.getAll().find(({ id }) => id === 1)).toEqual(undefined);
    });
  });

  describe('create', () => {
    it('should create movie.', () => {
      expect(service.getAll()).toEqual([]);
      service.create(testDto);
      expect(service.getOne(1)).toEqual({
        id: 1,
        ...testDto,
      });
    });
  });

  describe('update', () => {
    it('should update', () => {
      service.create(testDto);
      service.update(1, { title: 'update' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('update');
    });

    it('should throw 404 error', () => {
      try {
        service.update(10000, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
