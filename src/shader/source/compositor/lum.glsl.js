export default "@export qtek.compositor.hdr.log_lum\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\n@import qtek.util.rgbm\nvoid main()\n{\n    vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));\n    float luminance = dot(tex.rgb, w);\n    luminance = log(luminance + 0.001);\n    gl_FragColor = encodeHDR(vec4(vec3(luminance), 1.0));\n}\n@end\n@export qtek.compositor.hdr.lum_adaption\nvarying vec2 v_Texcoord;\nuniform sampler2D adaptedLum;\nuniform sampler2D currentLum;\nuniform float frameTime : 0.02;\n@import qtek.util.rgbm\nvoid main()\n{\n    float fAdaptedLum = decodeHDR(texture2D(adaptedLum, vec2(0.5, 0.5))).r;\n    float fCurrentLum = exp(encodeHDR(texture2D(currentLum, vec2(0.5, 0.5))).r);\n    fAdaptedLum += (fCurrentLum - fAdaptedLum) * (1.0 - pow(0.98, 30.0 * frameTime));\n    gl_FragColor = encodeHDR(vec4(vec3(fAdaptedLum), 1.0));\n}\n@end\n@export qtek.compositor.lum\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\nvoid main()\n{\n    vec4 tex = texture2D( texture, v_Texcoord );\n    float luminance = dot(tex.rgb, w);\n    gl_FragColor = vec4(vec3(luminance), 1.0);\n}\n@end";
