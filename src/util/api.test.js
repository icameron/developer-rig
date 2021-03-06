import { convertViews, fetchManifest, fetchExtensionManifest, fetchUserInfo, fetchProducts } from './api';
import {
  mockFetchError,
  mockFetchForExtensionManifest,
  mockFetchForManifest,
  mockFetchForUserInfo,
  mockFetchProducts
} from '../tests/mocks';

describe('api', () => {
  describe('fetchManifest', () => {
    beforeEach(function() {
      global.fetch = jest.fn().mockImplementation(mockFetchForManifest);
    });

    it('should return data', async function () {
      await fetchManifest('127.0.0.1:8080', 'clientId', 'username', 'version', 'channelId', 'secret', data => {
        expect(data).toBeDefined();
      }, jest.fn());
    });

    it('on error should be fired ', async function () {
      const onError = jest.fn();
      global.fetch = jest.fn().mockImplementation(mockFetchError);
      await fetchManifest('127.0.0.1:8080', 'clientId', '', '', '', '', data => {
        expect(data).toBeDefined();
      }, onError);
      expect(onError).toHaveBeenCalled();
    });
  })

  describe('fetchExtensionManifest', () => {
    beforeEach(function() {
      global.fetch = jest.fn().mockImplementation(mockFetchForExtensionManifest);
    });

    it('should return data', async function () {
      await fetchExtensionManifest('127.0.0.1:8080', 'clientId', 'version', 'jwt', (data) => {
        expect(data).toBeDefined();
      });
    });
  });

  describe('fetchUserInfo', () => {
    beforeEach(() => {
      global.fetch = jest.fn().mockImplementation(mockFetchForUserInfo);
    });
    it('should return data', async function () {
      await fetchUserInfo('127.0.0.1:8080', 'token', (data) => {
        expect(data).toBeDefined();
      });
    });

    it('on error should fire', async function () {
      const onError = jest.fn()
      global.fetch = jest.fn().mockImplementation(mockFetchError);
      await fetchUserInfo('127.0.0.1:8080', 'token', () => { }, onError);
      expect(onError).toHaveBeenCalled();
    });
  });

  describe('convertViews', () => {
    const data = {
      config: {
        viewer_url: 'test',
      },
      hidden: {
        viewer_url: 'test',
      },
      live_config: {
        viewer_url: 'test',
      },
      video_overlay: {
        viewer_url: 'test',
      },
      panel: {
        viewer_url: 'test',
      },
    };

    it('should convert camel case views correctly', () => {
      const results = convertViews(data);
      expect(results.config.viewerUrl).toBe('test');
      expect(results.liveConfig.viewerUrl).toBe('test');
      expect(results.videoOverlay.viewerUrl).toBe('test');
      expect(results.panel.viewerUrl).toBe('test');
      expect(results.hidden.viewerUrl).toBe('test');
    });
  });

  describe('fetchProducts', () => {
    beforeEach(function() {
      global.fetch = jest.fn().mockImplementation(mockFetchProducts);
    });

    it('should return products', async function () {
      await fetchProducts('127.0.0.1:8080', 'clientId', (products) => {
        expect(products).toBeDefined();
      }, jest.fn());
    });

    it('should serialize products correctly', async function () {
      await fetchProducts('127.0.0.1:8080', 'clientId', (products) => {
        expect(products).toHaveLength(2);
        products.forEach(product => {
          expect(product).toMatchObject({
            sku: expect.any(String),
            displayName: expect.any(String),
            amount: expect.stringMatching(/[1-9]\d*/),
            inDevelopment: expect.stringMatching(/true|false/),
            broadcast: expect.stringMatching(/true|false/)
          });
        });
      }, jest.fn());
    });
  });
});
