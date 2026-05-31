import { Project, SyntaxKind } from 'ts-morph';

const startTime = Date.now();

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🚀 Return Type Annotation Script');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

project.addSourceFilesAtPaths(['src/**/*.ts', 'src/**/*.tsx', 'scripts/**/*.ts', 'scripts/**/*.tsx']);

const sourceFiles = project.getSourceFiles();

console.log(`📁 Files discovered: ${sourceFiles.length}`);
console.log('');

let processedFiles = 0;
let updatedFiles = 0;
let failedFiles = 0;
let annotatedFunctions = 0;

for (const sourceFile of sourceFiles) {
  processedFiles++;

  const relativePath = sourceFile.getFilePath();

  process.stdout.write(`[${processedFiles}/${sourceFiles.length}] ${relativePath} ... `);

  try {
    let modified = false;

    const functions = [
      ...sourceFile.getFunctions(),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration),
    ];

    let fileAnnotations = 0;

    for (const fn of functions) {
      if (fn.getReturnTypeNode()) {
        continue;
      }

      for (const doc of fn.getJsDocs()) {
        const returnsTag = doc.getTags().find((tag) => tag.getTagName() === 'returns');

        if (!returnsTag) {
          continue;
        }

        const match = returnsTag.getText().match(/\{([^}]+)\}/);

        if (!match) {
          continue;
        }

        const returnType = match[1].trim();

        fn.setReturnType(returnType);

        modified = true;
        fileAnnotations++;
        annotatedFunctions++;

        console.log(`\n  ✓ ${fn.getName() ?? '<anonymous>'} -> ${returnType}`);
      }
    }

    if (modified) {
      await sourceFile.save();
      updatedFiles++;

      console.log(`✓ UPDATED (${fileAnnotations} annotations)`);
    } else {
      console.log('• SKIPPED');
    }
  } catch (error) {
    failedFiles++;

    console.log('✗ FAILED');

    if (error instanceof Error) {
      console.error(`  ${error.message}`);
    } else {
      console.error(`  ${String(error)}`);
    }
  }
}

const duration = ((Date.now() - startTime) / 1000).toFixed(2);

console.log('');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Files scanned      : ${processedFiles}`);
console.log(`Files updated      : ${updatedFiles}`);
console.log(`Files failed       : ${failedFiles}`);
console.log(`Types annotated    : ${annotatedFunctions}`);
console.log(`Duration           : ${duration}s`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('');

if (failedFiles > 0) {
  process.exit(1);
}
