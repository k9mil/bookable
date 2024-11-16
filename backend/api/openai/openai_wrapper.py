from openai import OpenAI
import json
from typing import List
from io import BytesIO

class OpenAIWrapper:
    def __init__(self) -> None:
        self.client = OpenAI()
        self.prompt = """
You are an expert product strategist and business consultant specialising in transforming ideas into market-ready products. Your task is to analyse the provided current state and, if needed, generate a high-level question to complete the initial product overview.

Input format:
    {
    "current_state": {
        "core_product_purpose": [string or null],
        "product_description": [string or null],
        "users_of_system": [string or null],
        "timeline": [string or null],
        "budget": [string or null]
    }
}
Instructions:

Only fill in one thing in `current_state` at a time. This is crucial!
Accept brief, high-level descriptions as complete. Even short, somewhat non-clear answers should be accepted as valid
For fields with vague or unclear answers, build questions based on what was shared
For empty fields (null), ask broad, open-ended questions
Mark 'done' as True when all fields have basic descriptions
For product_description, combine existing information with new details while maintaining clarity
YOUR RESPONSE ONLY SHOULD CONTAIN THE JSON FORMAT BELOW. NOTHING ELSE.

Response format:
{
"done": [true/false],
"current_state": {
"core_product_purpose": [string or null],
"product_description": [string or null],
"users_of_system": [string or null],
"timeline": [string or null],
"budget": [string or null]
},
"main_response": [single high-level question or null if done]
}"
        """
        self.prompt_second = """
You are an expert product strategist and business consultant specialising in transforming ideas into market-ready products. Your task is to analyse the provided current state and, engage with the user while also providing suggestions of functionality to the user.

Input format:
{
"current_state": {
"core_product_purpose": [string or null],
"product_description": [string or null],
"users_of_system": [string or null],
"timeline": [string or null],
"budget": [string or null]
}
}

Instructions:

Enage with the user in a helpful manner
Provide suggestions in the format of, Do you wish to have [xyz] functionality? Or, how does [xyz] functionality sound?
A maximum of 3 suggestions per response.
Do not under any circumstance provide suggestions in the main response, just be kind and make comments on the suggestions.
Please provide suggestions in the JSON below format. You MUST provide at least 3 requirements, and a main response, regardless of the data you receive.
You must use the specified JSON format, and have each suggestions as a string in the `approved_requirements` key.
YOUR RESPONSE ONLY SHOULD CONTAIN THE JSON FORMAT BELOW. NOTHING ELSE.
THE CURRENT_REQUIREMENTS ARE ONLY USER PROVIDED REQUIREMENTS. NEVER ADD ANYTHING THERE YOURSELF.

Response format:
{
    "current_requirements": [
        [string or null]
    ]
    "suggested_requirements": [
        [string],
        [string],
        [string]
    ],
    "main_response": [single high-level question or null if done]
}
"""
        self.prd_prompt = """Create a focused Product Requirements Document (PRD) based strictly on these requirements:

{requirements}

Format the PRD, keeping each section brief and focused only on the provided requirements:

1. Overview (2-3 sentences)
2. Requirements Breakdown
   - Functional Requirements
   - Technical Requirements
3. Success Criteria
4. Timeline

Important:
- Only include information directly related to the provided requirements
- Keep the document concise and specific
- Do not add assumptions or requirements that weren't explicitly listed
- Focus on clarity over comprehensiveness

PLEASE DO NOT MAKE UP NEW REQUIREMENTS AND KEEP IT STRICLTY TO THE GIVEN ARGUMENTS
"""

    def prompt_chat(
        self,
        current_state: dict,
        user_message: str,
        temperature: float = 0.2,
        max_tokens: int = 4096,
    ) -> str:
        try:
            chat_completion = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": self.prompt},
                    {"role": "user", "content": f"Current State: {json.dumps(current_state)}"},
                    {"role": "user", "content": user_message},
                ],
                max_tokens=max_tokens,
                temperature=temperature,
            )
            return str(chat_completion.choices[0].message.content)
        except Exception as e:
            raise Exception(f"Error calling OpenAI API: {str(e)}")

    def suggestion_gathering(
        self,
        current_requirements: List[str],
        user_message: str,
        temperature: float = 0.2,
        max_tokens: int = 4096,
    ) -> str:
        try:
            chat_completion = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": self.prompt_second},
                    {"role": "user", "content": f"Requirements: {json.dumps(current_requirements)}"},
                    {"role": "user", "content": user_message},
                ],
                max_tokens=max_tokens,
                temperature=temperature,
            )
            return str(chat_completion.choices[0].message.content)
        except Exception as e:
            raise Exception(f"Error calling OpenAI API: {str(e)}")

    def generate_prd(self, requirements: List[str]) -> str:
        formatted_requirements = "\n".join([f"- {req}" for req in requirements])
        prompt = self.prd_prompt.format(requirements=formatted_requirements)
        
        try:
            chat_completion = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": prompt},
                ],
                temperature=0.5,
                max_tokens=1000   # Limited length
            )
            return str(chat_completion.choices[0].message.content)
        except Exception as e:
            raise Exception(f"Error generating PRD: {str(e)}")

    def transcribe_audio(self, buffer: BytesIO) -> str:
        transcription = self.client.audio.transcriptions.create(
            model="whisper-1",
            file=buffer,
        )

        return transcription.text