import request from 'supertest';
import bcrypt from 'bcrypt';
import { sendMailConfig } from '../config/sendMail.js';
import { accessTokenGenerator } from '../config/accessTokenGen.js';
import { refreshTokenGenerator } from '../config/refreshTokenGen.js';
import User from '../model/user.mode.js';
import app from '../index.js';
jest.mock('../model/user.mode.js'); // Mock User model
jest.mock('bcrypt'); // Mock bcrypt
jest.mock('../config/sendMail.js'); // Mock sendMailConfig
jest.mock('../config/accessTokenGen.js'); // Mock accessTokenGenerator
jest.mock('../config/refreshTokenGen.js'); // Mock refreshTokenGenerator

describe('User Controller Tests', () => {
  describe('GET /users/:id - SingleUser', () => {
    it('should return a user if found', async () => {
      const mockUser = {
        _id: '677386c4b21e2f7d71800465',
        name: 'admin',
        email: 'admin1@gmail.com',
        address_details: {},
        shopping_card: {},
      };

      User.findOne.mockResolvedValue(mockUser);

      const response = await request(app).get('/user/677386c4b21e2f7d71800465');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        user: mockUser,
        error: false,
        success: true,
      });
    });

    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const response = await request(app).get('/users/123');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'user not found',
        error: true,
        success: false,
      });
    });
  });

  describe('POST /users/register - userRegisterController', () => {
    it('should register a user if data is valid', async () => {
      const mockRequest = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };

      const mockUser = {
        _id: '123',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashedpassword',
      };

      User.findOne.mockResolvedValue(null);
      bcrypt.genSalt.mockResolvedValue('salt');
      bcrypt.hash.mockResolvedValue('hashedpassword');
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue(mockUser),
      }));

      const response = await request(app).post('/users/register').send(mockRequest);
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        data: mockUser,
        success: true,
        error: false,
      });
    });

    it('should return 400 if email is already registered', async () => {
      const mockRequest = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue({ email: 'jane@example.com' });

      const response = await request(app).post('/users/register').send(mockRequest);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'this email is already registered',
        error: true,
        success: false,
      });
    });
  });

  describe('POST /users/login - userlogincontroller', () => {
    it('should login successfully with correct credentials', async () => {
      const mockUser = {
        _id: '123',
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'hashedpassword',
        isvalidator: true,
        role: 'user',
      };

      const mockRequest = {
        email: 'jane@example.com',
        password: 'password123',
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      accessTokenGenerator.mockResolvedValue('access-token');
      refreshTokenGenerator.mockResolvedValue('refresh-token');

      const response = await request(app).post('/users/login').send(mockRequest);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        message: 'Login in successfull',
        error: false,
        success: true,
        accessToken: 'Bearer access-token',
        refreshToken: 'Bearer refresh-token',
        user: {
          name: 'Jane Doe',
          email: 'jane@example.com',
          id: '123',
          role: 'user',
        },
      });
    });

    it('should return 400 if password does not match', async () => {
      const mockUser = {
        email: 'jane@example.com',
        password: 'hashedpassword',
      };

      const mockRequest = {
        email: 'jane@example.com',
        password: 'wrongpassword',
      };

      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app).post('/users/login').send(mockRequest);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'password not match',
        error: true,
        success: false,
      });
    });

    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const mockRequest = {
        email: 'jane@example.com',
        password: 'password123',
      };

      const response = await request(app).post('/users/login').send(mockRequest);
      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: 'user not found',
        error: true,
        success: false,
      });
    });
  });
});
