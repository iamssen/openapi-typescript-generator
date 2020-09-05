package ssen.codegen;

import org.junit.Test;
import org.openapitools.codegen.ClientOptInput;
import org.openapitools.codegen.DefaultGenerator;
import org.openapitools.codegen.config.CodegenConfigurator;

public class SSenTypeScriptCodegenTest {
  @Test
  public void launchCodeGenerator() {
    final CodegenConfigurator configurator = new CodegenConfigurator().setGeneratorName("ssen-typescript");

    String[][] targets = { {
        "https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/2_0/petstore.yaml",
        "out/ssen-typescript" } };

    DefaultGenerator generator = new DefaultGenerator();

    for (String[] target : targets) {
      final ClientOptInput clientOptInput = configurator.setInputSpec(target[0]).setOutputDir(target[1])
          .toClientOptInput();

      generator.opts(clientOptInput).generate();
    }
  }
}