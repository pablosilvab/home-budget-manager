import { Test, TestingModule } from '@nestjs/testing';
import { FormatDateInterceptor } from './format-date.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import * as moment from 'moment';

describe('FormatDateInterceptor', () => {
  let interceptor: FormatDateInterceptor;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormatDateInterceptor],
    }).compile();

    interceptor = module.get<FormatDateInterceptor>(FormatDateInterceptor);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should format date fields in an object', () => {
    const mockData = {
      name: 'Test',
      dateOfBirth: new Date('1990-01-01'),
      createdAt: new Date('2020-01-01'),
    };

    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of(mockData),
    } as CallHandler;

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe((data) => {
      expect(data.dateOfBirth).toBe(moment(mockData.dateOfBirth).format('DD/MM/YYYY'));
      expect(data.createdAt).toBe(moment(mockData.createdAt).format('DD/MM/YYYY'));
      expect(data.name).toBe('Test');
    });
  });

  it('should format date fields in an array of objects', () => {
    const mockData = [
      {
        name: 'Test 1',
        createdAt: new Date('2020-01-01'),
      },
      {
        name: 'Test 2',
        createdAt: new Date('2021-02-01'),
      },
    ];

    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of(mockData),
    } as CallHandler;

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe((data) => {
      expect(data[0].createdAt).toBe(moment(mockData[0].createdAt).format('DD/MM/YYYY'));
      expect(data[1].createdAt).toBe(moment(mockData[1].createdAt).format('DD/MM/YYYY'));
      expect(data[0].name).toBe('Test 1');
      expect(data[1].name).toBe('Test 2');
    });
  });

  it('should not modify non-date fields', () => {
    const mockData = {
      name: 'Test',
      age: 30,
    };

    const mockExecutionContext = {} as ExecutionContext;
    const mockCallHandler = {
      handle: () => of(mockData),
    } as CallHandler;

    interceptor.intercept(mockExecutionContext, mockCallHandler).subscribe((data) => {
      expect(data.name).toBe('Test');
      expect(data.age).toBe(30);
    });
  });
});
