Feature: ya-done example

    Scenario: webdriver is simple with ya-done
      Given a web browser
      When the browser navigates to github
      Then the headers should not be hello world
      And end the test
