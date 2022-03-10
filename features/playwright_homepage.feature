@ui
Feature: Playwright homepage

  Background:
    Given Playwright Homepage Is Opened

  Scenario: Change theme
    Given Theme Is Set To "light" mode
    When Change theme to "dark" mode
    Then We See "dark" mode