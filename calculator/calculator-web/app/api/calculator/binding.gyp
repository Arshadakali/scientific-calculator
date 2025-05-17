{
  "targets": [
    {
      "target_name": "cpp_calculator",
      "sources": [
        "../../../calculator.cpp",
        "calculator_bridge.cpp"
      ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ],
      "cflags!": ["-fno-exceptions"],
      "cflags_cc!": ["-fno-exceptions"],
      "conditions": [
        ["OS==\"win\"", {
          "defines": ["UNICODE"],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1
            }
          }
        }]
      ]
    }
  ]
}
