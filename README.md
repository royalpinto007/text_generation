# Open Source AI Text Generation for CKEditor 5

Hello and thanks for checking out our Text Generation module!

We're bringing the power of open-source AI directly into your CKEditor 5 toolkit, making it easier than ever to jump-start your content creation or break through writer's block.

Project page: [Visit on Drupal.org](https://www.drupal.org/project/text_generation)

This module utilizes an open-source AI model to generate text based on your prompts, making it a fantastic resource for sparking new ideas or accelerating content creation—all without the need for API keys or complex setups.

## Features

- **Open-Source AI**: Powered by a completely open-source AI, this module for Drupal is free to use and modify, providing a secure and cost-effective solution for content generation.
- **Instant Text Generation**: Just type in your concept, and let the AI provide you with content that you can immediately use or build upon. (Currently supports [Xenova/gpt2](https://huggingface.co/Xenova/gpt2) model)

## Installation

Compatible with Drupal 10 and above.

```bash
composer require 'drupal/text_generation:1.0.x-dev@dev'
```

## Getting Started

To enable the module, you can use Drupal’s admin interface or Drush. Here’s how to do it with Drush:

```bash
drush en text_generation -y
```

After enabling the module, configure it by navigating through your Drupal admin panel:

1. Go to the **Configuration** section.
2. Select **Content Authoring**.
3. Choose **Text formats and editors**.
4. Configure your CKEditor 5 toolbar by selecting our module and placing it on the toolbar.

Once set up, the module will be ready to use, allowing you to seamlessly generate text right within CKEditor 5.

## Usage

Find the text_generation icon button in your CKEditor 5 toolbar. Click it, enter your prompt, and watch as the AI brings your ideas to text. It’s that simple!

## Contribution

Join our community on Drupal.org to track issues, contribute code, or suggest improvements. Your feedback and contributions drive the continuous enhancement of this module.

## License

This module is licensed under the MIT License, ensuring it is free for personal and commercial use.
