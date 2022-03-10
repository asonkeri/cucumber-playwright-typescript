@api
Feature: JSON Placeholder API

  Scenario: Modify post
    Given Post "testpost" Is Created With Body "testbody"
    When Post "testpost" Is Modified With Body "modified"
    Then Post "testpost" Has Body "modified"