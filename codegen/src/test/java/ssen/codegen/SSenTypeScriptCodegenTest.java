package ssen.codegen;

import org.junit.Test;
import org.openapitools.codegen.ClientOptInput;
import org.openapitools.codegen.DefaultGenerator;
import org.openapitools.codegen.config.CodegenConfigurator;

public class SSenTypeScriptCodegenTest {
  @Test
  public void launchCodeGenerator() {
    final CodegenConfigurator configurator = new CodegenConfigurator().setGeneratorName("ssen-typescript");

    String[][] targets = {
      { "../resources/3_0/allOf_composition_discriminator.yaml", "../gen/ssen-typescript/allOf_composition_discriminator" },
      { "../resources/petstore.json", "../gen/ssen-typescript/petstore" },
      { "../resources/3_0/asciidoc/api-docs.json", "../gen/ssen-typescript/api-docs" },
      { "../resources/3_0/composed-oneof.yaml", "../gen/ssen-typescript/composed-oneof" },
      { "../resources/integrationtests/typescript/objectsWithEnums-spec.json", "../gen/ssen-typescript/objectsWithEnums-spec" },
    };

    DefaultGenerator generator = new DefaultGenerator();

    for (String[] target : targets) {
      final ClientOptInput clientOptInput = configurator.setInputSpec(target[0]).setOutputDir(target[1])
          .toClientOptInput();

      generator.opts(clientOptInput).generate();
    }
  }
}