<?php

namespace Drupal\text_generation\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Drupal\Core\Controller\ControllerBase;
use function Codewithkyrian\Transformers\Pipelines\pipeline;

class TextGenerationController extends ControllerBase {
    public function generateText(Request $request) {
        $text = $request->get('text');
        
        if (empty($text)) {
            return new JsonResponse(['error' => 'No text provided'], 400);
        }

        $generator = pipeline('text2text-generation', 'Xenova/flan-t5-small');
        $output = $generator($text);

        return new JsonResponse(['generated_text' => $output[0]['generated_text']]);
    }
}
