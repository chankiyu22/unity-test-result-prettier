# Unity Test Result Pretty Print Action

A simple action to print unity test result from xml file

```
✗ Test Run (example.xml): Failed(Child) (4 + 1 + 0)/5
  ✗ Unity-Dialogue-System: Failed (4 + 1 + 0)/5
    ✗ Chankiyu22.DialogueSystem.Tests.dll: Failed (4 + 1 + 0)/5
      ✗ Chankiyu22: Failed (4 + 1 + 0)/5
        ✗ DialogueSystem: Failed (4 + 1 + 0)/5
          ✗ Dialogues: Failed (4 + 1 + 0)/5
            ✓ TestDialogue: Passed (2 + 0 + 0)/2
              ✓ TestBranchedDialogue: Passed
              ✓ TestLinearDialogue: Passed
            ✓ TestDialogueOption: Passed (1 + 0 + 0)/1
              ✓ TestOptions: Passed
            ✗ TestStartDialogue: Failed (1 + 1 + 0)/2
              ✓ Test_DialogueController_StartDialogue: Passed
              ✗ Test_DialogueController_StartDialogueWithInitialVariables_VariableAssignmentsStaticController: Failed
```

## Inputs

### path

**Required** Path of test result xml file

## Outputs

This action results in no outputs.

## Example usage

```
uses: chankiyu22/unity-test-result-prettier@v0.0.1
with:
  path: ${{ steps.tests.outputs.artifactsPath }}
```

## Development

```sh
$ npm install
$ npm run build
$ npm run format
```
