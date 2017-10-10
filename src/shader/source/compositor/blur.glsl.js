export default "@export qtek.compositor.kernel.gaussian_9\nfloat gaussianKernel[9];\ngaussianKernel[0] = 0.07;\ngaussianKernel[1] = 0.09;\ngaussianKernel[2] = 0.12;\ngaussianKernel[3] = 0.14;\ngaussianKernel[4] = 0.16;\ngaussianKernel[5] = 0.14;\ngaussianKernel[6] = 0.12;\ngaussianKernel[7] = 0.09;\ngaussianKernel[8] = 0.07;\n@end\n@export qtek.compositor.kernel.gaussian_13\nfloat gaussianKernel[13];\ngaussianKernel[0] = 0.02;\ngaussianKernel[1] = 0.03;\ngaussianKernel[2] = 0.06;\ngaussianKernel[3] = 0.08;\ngaussianKernel[4] = 0.11;\ngaussianKernel[5] = 0.13;\ngaussianKernel[6] = 0.14;\ngaussianKernel[7] = 0.13;\ngaussianKernel[8] = 0.11;\ngaussianKernel[9] = 0.08;\ngaussianKernel[10] = 0.06;\ngaussianKernel[11] = 0.03;\ngaussianKernel[12] = 0.02;\n@end\n@export qtek.compositor.gaussian_blur\n#define SHADER_NAME gaussian_blur\nuniform sampler2D texture;varying vec2 v_Texcoord;\nuniform float blurSize : 2.0;\nuniform vec2 textureSize : [512.0, 512.0];\nuniform float blurDir : 0.0;\n@import qtek.util.rgbm\n@import qtek.util.clamp_sample\nvoid main (void)\n{\n    @import qtek.compositor.kernel.gaussian_9\n    vec2 off = blurSize / textureSize;\n    off *= vec2(1.0 - blurDir, blurDir);\n    vec4 sum = vec4(0.0);\n    float weightAll = 0.0;\n    for (int i = 0; i < 9; i++) {\n        float w = gaussianKernel[i];\n        vec4 texel = decodeHDR(clampSample(texture, v_Texcoord + float(i - 4) * off));\n        sum += texel * w;\n        weightAll += w;\n    }\n    gl_FragColor = encodeHDR(sum / max(weightAll, 0.01));\n}\n@end\n";
