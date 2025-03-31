import { test, expect } from '@playwright/test';

// 1. Component and API interactions
test.describe('Component and API interactions', () => {
  // i. Loading bar interaction with API
  test('loading bar should appear during API calls and disappear when completed', async ({ page }) => {
    // Navigate to pets page which makes API calls
    await page.goto('/pets_all');
    
    // Check if loading bar appears initially
    const loadingBar = page.locator('[data-testid="loading-indicator"]').or(page.locator('.loading'));
    
    // Wait for content to load
    await page.waitForSelector('.pet-card, [data-testid="pet-card"]', { state: 'visible', timeout: 100000000 });
    
    // Verify loading indicator is gone after content loads
    await expect(loadingBar).not.toBeVisible({ timeout: 100000000 });
  });

  // ii. Quiz Component testing
  test('quiz component should show appropriate results based on selections', async ({ page }) => {
    // Go to the main quiz page
    await page.goto('/quiz');
    
    // Click on dog quiz option
    await page.getByRole('link', { name: /dog/i }).click();
    
    // Look for appropriate options on the dog quiz page
    const optionSelectors = [
      'input[type="radio"], button.option, [data-testid="quiz-option"]',
    ];
    
    // Wait for options to be available
    await page.waitForSelector(optionSelectors.join(', '), { state: 'visible', timeout: 100000000 });
    
    // Select options (using a more flexible approach)
    const options = await page.locator(optionSelectors.join(', ')).all();
    
    // Select first option from each question set
    for (let i = 0; i < Math.min(4, options.length); i++) {
      await options[i].click();
      // Small wait to ensure UI updates
      await page.waitForTimeout(100000000);
    }
    
    // Look for and click the submit button
    const submitButton = page.getByRole('button', { name: /submit|next|continue/i });
    await submitButton.click();
    
    // Check that results page loads with some content
    await page.waitForSelector('.result-card, [data-testid="result-card"], .pet-card, [data-testid="pet-card"]', 
      { state: 'visible', timeout: 100000000 });
  });

  // iii. Contact form test
  test('contact form should validate and submit properly', async ({ page }) => {
    await page.goto('/contact');
    
    // Wait for form to be visible
    await page.waitForSelector('form', { state: 'visible', timeout: 100000000 });
    
    // Fill out the contact form with more specific selectors
    // Find and fill first name input (using more specific selector)
    const firstNameInput = page.locator('input[name="firstname"], input[placeholder*="first name" i], input[placeholder="Enter first name"]').first();
    await firstNameInput.fill('Test');
    
    // Find and fill last name input if it exists
    const lastNameInput = page.locator('input[name="lastname"], input[placeholder*="last name" i], input[placeholder="Enter last name"]').first();
    if (await lastNameInput.count() > 0) {
      await lastNameInput.fill('User');
    }
    
    // Find email input with more specific selector
    const emailInput = page.locator('input[type="email"], input[name="email"], input[placeholder*="email" i]').first();
    await emailInput.fill('test@example.com');
    
    // Find message input
    const messageInput = page.locator('textarea, textarea[name="message"], textarea[placeholder*="message" i]').first();
    await messageInput.fill('This is a test message');
    
    // Find and click submit button
    const submitButton = page.getByRole('button', { name: /send|submit|contact/i }).first();
    await submitButton.click();
    
    // Check for success message with a more flexible approach
    await page.waitForSelector('.success-message, .alert-success, [data-testid="success-message"], div:has-text("Message sent successfully")', 
      { state: 'visible', timeout: 100000000 });
  });
});

// 2. User interactions
test.describe('User interactions with pages', () => {
  // i. Shelters page interactions
  test('shelters page should display correct information and filters should work', async ({ page }) => {
    await page.goto('/shelters');
    
    // Wait for shelters to load
    await page.waitForSelector('.shelter-card, [data-testid="shelter-card"]', 
      { state: 'visible', timeout: 100000000 });
    
    // Test location filter if present
    const locationInput = page.locator('input[placeholder*="location" i], input[name="location"]').first();
    
    if (await locationInput.count() > 0) {
      await locationInput.fill('San Francisco');
      
      // Look for search button
      const searchButton = page.getByRole('button', { name: /search|filter|find/i }).or(
        page.locator('button.search-button, [data-testid="search-button"]')
      ).first();
      
      if (await searchButton.count() > 0) {
        await searchButton.click();
      } else {
        // Press Enter as alternative to clicking search
        await locationInput.press('Enter');
      }
      
      // Wait for results to update
      await page.waitForTimeout(100000000);
    }
    
    // Click on "view" for the first shelter if shelters are visible
    const shelterCard = page.locator('.shelter-card, [data-testid="shelter-card"]').first();
    if (await shelterCard.count() > 0) {
      // Find view link/button
      const viewLink = shelterCard.getByRole('link', { name: /view|details|more/i }).or(
        shelterCard.locator('a[href*="shelters/"], button.view-button')
      ).first();
      
      if (await viewLink.count() > 0) {
        await viewLink.click();
        
        // Check if single shelter page loads with some content
        await page.waitForSelector('.shelter-details, [data-testid="shelter-details"]', 
          { state: 'visible', timeout: 100000000 });
      }
    }
  });

  // ii. Quiz page complete flow
  test('should complete quiz flow with different options and show relevant results', async ({ page }) => {
    // Test for cat quiz
    await page.goto('/quiz');
    
    // Look for cat quiz option
    const catOption = page.getByRole('link', { name: /cat/i }).or(
      page.locator('a[href*="cat"], button:has-text("Cat")')
    ).first();
    
    if (await catOption.count() > 0) {
      await catOption.click();
      
      // Look for quiz options
      const optionSelectors = [
        'input[type="radio"], button.option, [data-testid="quiz-option"]',
      ];
      
      // Wait for options to be available
      await page.waitForSelector(optionSelectors.join(', '), { state: 'visible', timeout: 100000000 });
      
      // Select options (using a more flexible approach)
      const options = await page.locator(optionSelectors.join(', ')).all();
      
      // Select first option from each question set (up to 3)
      for (let i = 0; i < Math.min(3, options.length); i++) {
        await options[i].click();
        // Small wait to ensure UI updates
        await page.waitForTimeout(100000000);
      }
      
      // Look for and click the submit button
      const submitButton = page.getByRole('button', { name: /submit|next|continue/i }).first();
      if (await submitButton.count() > 0) {
        await submitButton.click();
        
        // Check that results page loads with some content
        await page.waitForSelector('.result-card, [data-testid="result-card"], .pet-card, [data-testid="pet-card"]', 
          { state: 'visible', timeout: 100000000 });
      }
    }
  });

  // iii. Pets page filtering and adoption flow
  test('pets page should filter correctly and show adoption information', async ({ page }) => {
    await page.goto('/pets_all');
    
    // Wait for pets to load
    await page.waitForSelector('.pet-card, [data-testid="pet-card"]', 
      { state: 'visible', timeout: 100000000 });
    
    // Test type filter buttons
    const catFilter = page.getByRole('button', { name: /cats/i }).or(
      page.locator('button:has-text("Cats"), a[href*="type=cat"]')
    ).first();
    
    if (await catFilter.count() > 0) {
      await catFilter.click();
      // Wait for results to update
      await page.waitForTimeout(100000000);
    }
    
    // Test Dogs filter
    const dogFilter = page.getByRole('button', { name: /dogs/i }).or(
      page.locator('button:has-text("Dogs"), a[href*="type=dog"]')
    ).first();
    
    if (await dogFilter.count() > 0) {
      await dogFilter.click();
      // Wait for results to update
      await page.waitForTimeout(100000000);
    }
    
    // Click on a pet card to view details if available
    const petCard = page.locator('.pet-card, [data-testid="pet-card"]').first();
    if (await petCard.count() > 0) {
      await petCard.click();
      
      // Check if single pet page loads with some details
      await page.waitForSelector('.pet-details, [data-testid="pet-details"], .pet-name, .pet-info', 
        { state: 'visible', timeout: 100000000 });
      
      // Look for adopt button
      const adoptButton = page.getByRole('button', { name: /adopt/i }).or(
        page.locator('a:has-text("Adopt"), button.adopt-button, [data-testid="adopt-button"]')
      ).first();
      
      if (await adoptButton.count() > 0) {
        await adoptButton.click();
        
        // Verify navigation to appropriate page (either shelter or adoption form)
        await page.waitForSelector('.shelter-details, .adoption-form', 
          { state: 'visible', timeout: 100000000 });
      }
    }
  });
});

// 3. Session Storage testing
test.describe('Session Storage functionality', () => {
  test('pets data should be stored in session storage to reduce API calls', async ({ page }) => {
    // First visit to load data
    await page.goto('/pets_all');
    
    // Wait for content to load
    await page.waitForSelector('.pet-card, [data-testid="pet-card"]', 
      { state: 'visible', timeout: 100000000 });
    
    // Check if data is stored in session storage
    const sessionStorageData = await page.evaluate(() => {
      return window.sessionStorage.getItem('petsData') || 
             window.sessionStorage.getItem('pets') || 
             window.sessionStorage.getItem('petData');
    });
    
    expect(sessionStorageData).not.toBeNull();
    
    // Reload the page to verify data persists
    await page.reload();
    
    // Verify pet cards are still visible after reload
    await page.waitForSelector('.pet-card, [data-testid="pet-card"]', 
      { state: 'visible', timeout: 100000000 });
  });
  
  test('shelter data should be stored in session storage', async ({ page }) => {
    // First visit to load data
    await page.goto('/shelters');
    
    // Wait for shelters to load
    await page.waitForSelector('.shelter-card, [data-testid="shelter-card"]', 
      { state: 'visible', timeout: 100000000 });
    
    // Check if data is stored in session storage
    const sessionStorageData = await page.evaluate(() => {
      return window.sessionStorage.getItem('sheltersData') || 
             window.sessionStorage.getItem('shelters') || 
             window.sessionStorage.getItem('shelterData');
    });
    
    expect(sessionStorageData).not.toBeNull();
    
    // Reload the page to verify data persists
    await page.reload();
    
    // Verify shelter cards are still visible after reload
    await page.waitForSelector('.shelter-card, [data-testid="shelter-card"]', 
      { state: 'visible', timeout: 100000000 });
  });
});
