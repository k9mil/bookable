from openai import OpenAI
import json
from typing import List

class OpenAIWrapper:
    def __init__(self) -> None:
        self.client = OpenAI()
        self.prompt = """
You are an expert product strategist and business consultant specialising in transforming ideas into market-ready products. Your task is to analyse the provided current state and, if needed, generate a high-level question to complete the initial product overview.
Input format:
{
"current_state": {
"core_product_purpose": [string or null],
"key_stakeholders": [string or null],
"product_description": [string or null]
}
}
Instructions:

Review each field in current_state
Accept brief, high-level descriptions as complete. Even short, somewhat non-clear answers should be accepted as valid
For fields with vague or unclear answers, build questions based on what was shared
For empty fields (null), ask broad, open-ended questions
Mark 'done' as True when all fields have basic descriptions
For product_description, combine existing information with new details while maintaining clarity

Response format:
{
"done": [true/false],
"current_state": {
"core_product_purpose": [string or null],
"key_stakeholders": [string or null],
"product_description": [string or null]
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
"key_stakeholders": [string or null],
"product_description": [string or null]
}
}

Instructions:

Enage with the user in a helpful manner
Ask questions in the format of, Does you want [xyz] functionality? Or, how does [xyz] functionality sound?
A maximum of 3 suggestions per response.
Also contain a nice response engaging with the user, saying stuff like, how do these suggestions sounds and maybe give a rationale for them?

Response format:
{
    "approved_requirements": [
        [string],
        [string],
        [string]
    ]
}
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
