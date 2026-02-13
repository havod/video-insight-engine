// src/services/wordpress.ts - VERSION MINIMALE
class WordPressService {
  async submitLead(formData: {
    name: string;
    email: string;
    company: string;
    message: string;
  }) {
    const response = await fetch(window.wpData.ajaxUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        action: 'submit_lead',
        nonce: window.wpData.nonce,
        ...formData,
      }),
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.data?.message || 'Submission failed');
    }
    
    return result;
  }
}

export const wpService = new WordPressService();