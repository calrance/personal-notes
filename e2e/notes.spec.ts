import { expect, test } from '@playwright/test';

test.describe('Notes e2e', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.clear());
  });

  test('creates and updates a note', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel('Add').click();

    const titleInput = page.getByPlaceholder('Here goes the title');
    await expect(titleInput).toHaveValue('Untitled note');
    await titleInput.fill('E2E title');

    const contentInput = page.getByPlaceholder('Write your content here...');
    await contentInput.fill('E2E body');

    await expect(page.getByText('E2E title')).toBeVisible();
    await expect(contentInput).toHaveValue('E2E body');
  });

  test('filters notes by search term', async ({ page }) => {
    await page.goto('/');

    const searchInput = page.getByPlaceholder('Search');
    await page.getByLabel('Add').click();

    const titleInput = page.getByPlaceholder('Here goes the title');
    await titleInput.fill('Filter target');

    const contentInput = page.getByPlaceholder('Write your content here...');
    await contentInput.fill('Filter body');

    await searchInput.fill('Filter');
    await expect(page.getByText('Filter target')).toBeVisible();

    await searchInput.fill('missing');
    await expect(page.getByText('Filter target')).toHaveCount(0);
  });
});
