export default "@export qtek.deferred.point_light\n@import qtek.deferred.chunk.light_head\n@import qtek.util.calculate_attenuation\n@import qtek.deferred.chunk.light_equation\nuniform vec3 lightPosition;\nuniform vec3 lightColor;\nuniform float lightRange;\nuniform vec3 eyePosition;\n#ifdef SHADOWMAP_ENABLED\nuniform samplerCube lightShadowMap;\nuniform float lightShadowMapSize;\n#endif\nvarying vec3 v_Position;\n@import qtek.plugin.shadow_map_common\nvoid main()\n{\n    @import qtek.deferred.chunk.gbuffer_read\n    vec3 L = lightPosition - position;\n    vec3 V = normalize(eyePosition - position);\n    float dist = length(L);\n    L /= dist;\n    vec3 H = normalize(L + V);\n    float ndl = clamp(dot(N, L), 0.0, 1.0);\n    float ndh = clamp(dot(N, H), 0.0, 1.0);\n    float ndv = clamp(dot(N, V), 0.0, 1.0);\n    float attenuation = lightAttenuation(dist, lightRange);\n    gl_FragColor.rgb = attenuation * lightEquation(\n        lightColor, diffuseColor, specularColor, ndl, ndh, ndv, glossiness\n    );\n#ifdef SHADOWMAP_ENABLED\n    float shadowContrib = computeShadowContribOmni(\n        lightShadowMap, -L * dist, lightRange\n    );\n    gl_FragColor.rgb *= clamp(shadowContrib, 0.0, 1.0);\n#endif\n    gl_FragColor.a = 1.0;\n}\n@end";
