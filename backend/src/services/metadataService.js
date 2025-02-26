// backend/services/metadataService.js
const axios = require('axios');
const cheerio = require('cheerio');

const metadataService = {
  /**
   * Fetch metadata from a URL
   */
  async fetchMetadata(url) {
    try {
      // Try to add protocol if missing
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BookmarkManagerBot/1.0)'
        },
        timeout: 5000
      });
      
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Extract metadata
      const metadata = {
        title: $('title').text().trim() || '',
        description: $('meta[name="description"]').attr('content') || 
                    $('meta[property="og:description"]').attr('content') || '',
        favicon: ''
      };
      
      // Get favicon
      const faviconLink = $('link[rel="icon"]').attr('href') || 
                        $('link[rel="shortcut icon"]').attr('href');
      
      if (faviconLink) {
        // Handle relative URLs
        if (faviconLink.startsWith('/')) {
          // Extract domain from URL
          const urlObj = new URL(url);
          metadata.favicon = `${urlObj.protocol}//${urlObj.host}${faviconLink}`;
        } else if (!faviconLink.startsWith('http')) {
          // Handle other relative paths
          metadata.favicon = new URL(faviconLink, url).href;
        } else {
          metadata.favicon = faviconLink;
        }
      } else {
        // Default to root favicon
        const urlObj = new URL(url);
        metadata.favicon = `${urlObj.protocol}//${urlObj.host}/favicon.ico`;
      }
      
      return metadata;
    } catch (error) {
      // Return empty metadata if fetch fails
      return {
        title: '',
        description: '',
        favicon: ''
      };
    }
  }
};

module.exports = metadataService;