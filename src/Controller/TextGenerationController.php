<?php

namespace Drupal\text_generation\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use function Codewithkyrian\Transformers\Pipelines\pipeline;

/**
 * Defines the Text Generation Controller.
 */
class TextGenerationController extends ControllerBase {

  /**
   * Generates text using a machine learning model.
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The current request object, containing JSON data.
   *
   * @return \Symfony\Component\HttpFoundation\JsonResponse
   *   A JSON response with the generated text or an error message.
   */
  public function generateText(Request $request) {
    // Decode JSON from the request body.
    $data = json_decode($request->getContent(), TRUE);
    // Use null coalescing operator to handle absent key.
    $text = $data['text'] ?? NULL;

    if (empty($text)) {
      return new JsonResponse(['error' => 'No text provided'], 400);
    }

    $generator = pipeline('text-generation', 'Xenova/gpt2');
    $output = $generator($text);

    return new JsonResponse(['generated_text' => $output[0]['generated_text']]);
  }

}
