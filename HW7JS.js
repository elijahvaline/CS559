function start() {

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;
    var slider3 = document.getElementById('slider3');
    slider3.value = 0;

    // Read shader source
    var vertexSource = document.getElementById("vertexShader").text;
    var fragmentSource = document.getElementById("fragmentShader").text;

    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShader)); return null; }

    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);

    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vertexNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);

    // shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vertexColor");
    // gl.enableVertexAttribArray(shaderProgram.ColorAttribute);

    shaderProgram.texcoordAttribute = gl.getAttribLocation(shaderProgram, "vertexTexCoord");
    gl.enableVertexAttribArray(shaderProgram.texcoordAttribute);

    // this gives us access to the matrix uniform
    shaderProgram.MVmatrix = gl.getUniformLocation(shaderProgram,"uMV");
    shaderProgram.MvertexNormalmatrix = gl.getUniformLocation(shaderProgram,"uMVn");
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");

    // Attach samplers to texture units
    shaderProgram.texSampler1 = gl.getUniformLocation(shaderProgram, "texSampler1");
    gl.uniform1i(shaderProgram.texSampler1, 0);
    shaderProgram.texSampler2 = gl.getUniformLocation(shaderProgram, "texSampler2");
    gl.uniform1i(shaderProgram.texSampler2, 1);

    var vertexPos = new Float32Array(
        [0.797746,-0.146946,0.000000,
            0.825225,0.237764,-0.692446,
            0.611109,0.146946,-0.512781,
            0.138527,0.146946,-0.785626,
            -1.012288,0.237764,-0.368443,
            0.797746,0.146946,0.000000,
            -0.625000,0.000000,-1.082532,
            -0.538627,-0.237764,-0.932930,
            -1.012288,-0.237764,0.368443,
            -0.538627,-0.237764,0.932930,
            1.250000,0.000000,0.000000,
            1.077254,0.237764,0.000000,
            1.077254,-0.237764,0.000000,
            0.957555,0.000000,-0.803485,
            0.611109,-0.146946,-0.512781,
            0.825225,-0.237764,-0.692446,
            0.217060,0.000000,-1.231010,
            0.187063,0.237764,-1.060888,
            0.138527,-0.146946,-0.785626,
            0.187063,-0.237764,-1.060888,
            -0.538627,0.237764,-0.932930,
            -0.398873,0.146946,-0.690868,
            -0.398873,-0.146946,-0.690868,
            -1.174616,0.000000,-0.427526,
            -0.749636,0.146946,-0.272845,
            -0.749636,-0.146946,-0.272845,
            -1.012288,-0.237764,-0.368443,
            -1.174616,0.000000,0.427525,
            -1.012288,0.237764,0.368443,
            -0.749636,0.146946,0.272845,
            -0.749636,-0.146946,0.272845,
            -0.625000,0.000000,1.082532,
            -0.538627,0.237764,0.932930,
            -0.398873,0.146946,0.690868,
            -0.398873,-0.146946,0.690868,
            0.217060,0.000000,1.231010,
            0.187063,0.237764,1.060888,
            0.138527,0.146946,0.785626,
            0.138527,-0.146946,0.785626,
            0.957555,0.000000,0.803485,
            0.825225,0.237764,0.692446,
            0.611109,0.146946,0.512781,
            0.611109,-0.146946,0.512781,
            0.825225,-0.237764,0.692446,
            0.187063,-0.237764,1.060888,
            1.250000,0.000000,0.000000,
            0.957555,0.000000,-0.803485,
            0.217060,0.000000,-1.231010,
            -0.625000,0.000000,-1.082532,
            -1.174616,0.000000,-0.427526,
            -1.174616,0.000000,0.427525,
            -0.625000,0.000000,1.082532,
            0.217060,0.000000,1.231010,
            0.957555,0.000000,0.803485,
            0.138527,0.146946,-0.785626,
            -0.398873,0.146946,-0.690868,
            0.797746,0.146946,0.000000,
            0.611109,0.146946,-0.512781,
            -0.749636,0.146946,0.272845,
            -0.398873,0.146946,0.690868,
            0.138527,0.146946,0.785626,
            0.611109,0.146946,0.512781,
            -0.749636,0.146946,-0.272845]);

    // vertex normals
    var vertexNormalsRaw = new Float32Array(
        [0.6197,0.5878,-0.5200,
            0.4168,0.9090,0.0000,
            0.8090,0.5878,0.0000,
            0.3193,0.9090,-0.2679,
            -0.3090,0.9511,-0.0000,
            -0.7660,0.0000,0.6428,
            -0.7535,-0.6575,-0.0000,
            -1.0000,0.0000,0.0000,
            -0.5772,-0.6575,0.4843,
            0.4168,-0.9090,-0.0000,
            0.3193,-0.9090,-0.2679,
            0.8090,-0.5878,-0.0000,
            0.0724,0.9090,-0.4104,
            -0.0537,0.9511,0.3043,
            -0.2367,0.9511,0.1986,
            -0.1736,0.0000,0.9848,
            -0.1308,-0.6575,0.7420,
            0.1405,-0.5878,-0.7967,
            0.6197,-0.5878,-0.5200,
            -0.4045,0.5878,-0.7006,
            0.1405,0.5878,-0.7967,
            -0.2084,0.9090,-0.3609,
            0.5000,0.0000,0.8660,
            0.3767,-0.6575,0.6525,
            0.0724,-0.9090,-0.4104,
            -0.2084,-0.9090,-0.3609,
            -0.7602,0.5878,-0.2767,
            -0.3916,0.9090,-0.1425,
            0.1545,0.9511,0.2676,
            0.9397,0.0000,0.3420,
            0.7080,-0.6575,0.2577,
            -0.3916,-0.9090,-0.1425,
            -0.4045,-0.5878,-0.7006,
            -0.7602,0.5878,0.2767,
            0.2904,0.9511,-0.1057,
            0.2904,0.9511,0.1057,
            0.9397,0.0000,-0.3420,
            0.7080,-0.6575,-0.2577,
            -0.3916,-0.9090,0.1425,
            -0.7602,-0.5878,-0.2767,
            -0.4045,0.5878,0.7006,
            -0.3916,0.9090,0.1425,
            -0.2084,0.9090,0.3609,
            0.5000,0.0000,-0.8660,
            0.3767,-0.6575,-0.6525,
            -0.2084,-0.9090,0.3609,
            -0.7602,-0.5878,0.2767,
            0.1405,0.5878,0.7967,
            0.0724,0.9090,0.4104,
            0.1545,0.9511,-0.2676,
            -0.1736,0.0000,-0.9848,
            -0.1308,-0.6575,-0.7420,
            0.1405,-0.5878,0.7967,
            -0.4045,-0.5878,0.7006,
            0.3193,0.9090,0.2679,
            -0.0537,0.9511,-0.3043,
            -0.7660,0.0000,-0.6428,
            0.3193,-0.9090,0.2679,
            0.0724,-0.9090,0.4104,
            0.6197,-0.5878,0.5200,
            0.6197,0.5878,0.5200,
            -0.2367,0.9511,-0.1986,
            -0.5772,-0.6575,-0.4843]);


    // vertex texture coordinates
    var vertexTextureCoordsRaw = new Float32Array(
        [0.706975,0.850885,
            0.795230,0.610698,
            0.883936,0.640382,
            0.658192,0.771062,
            0.715726,0.581801,
            0.376567,0.396068,
            0.460127,0.265017,
            0.477930,0.343316,
            0.315745,0.345875,
            0.446142,0.178725,
            0.251172,0.287806,
            0.425953,0.082681,
            0.449920,0.805543,
            0.464745,0.722115,
            0.615978,0.697771,
            0.332830,0.494057,
            0.256501,0.496349,
            0.072662,0.496603,
            0.174739,0.225846,
            0.197872,0.760470,
            0.435987,0.898058,
            0.267906,0.698459,
            0.368046,0.593800,
            0.311881,0.646818,
            0.170887,0.494319,
            0.245499,0.701581,
            0.103722,0.502126,
            0.197217,0.499633,
            0.332707,0.643967,
            0.464067,0.647318,
            0.454293,0.725982,
            0.438077,0.811638,
            0.172518,0.767301,
            0.197843,0.243776,
            0.335761,0.356441,
            0.281804,0.499544,
            0.575393,0.630206,
            0.617015,0.697620,
            0.658807,0.774294,
            0.424124,0.909229,
            0.436276,0.106666,
            0.271007,0.302056,
            0.454824,0.198374,
            0.650070,0.548145,
            0.724239,0.573238,
            0.804978,0.605079,
            0.710295,0.858801,
            0.707133,0.154654,
            0.662475,0.236880,
            0.469418,0.281804,
            0.654517,0.440163,
            0.725932,0.411142,
            0.898680,0.346230,
            0.898681,0.636763,
            0.796905,0.399693,
            0.620146,0.310240,
            0.587519,0.357740,
            0.664461,0.214303,
            0.807230,0.382947,
            0.709886,0.127358,
            0.883936,0.365370,
            0.717388,0.428718,
            0.621413,0.288682]);

    var indices = new Uint8Array([
        47,1,1,12,2,2,11,3,3,
        2,4,4,57,5,5,12,2,2,
        58,6,6,1,7,7,6,8,8,
        15,9,9,13,10,10,1,7,7,
        16,11,11,46,12,12,13,10,10,
        47,1,1,18,13,13,2,4,4,
        2,4,4,4,14,14,3,15,15,
        55,16,16,15,9,9,58,6,6,
        19,17,17,16,11,11,15,9,9,
        16,11,11,48,18,18,14,19,19,
        7,20,20,18,13,13,17,21,21,
        21,22,22,4,14,14,18,13,13,
        56,23,23,19,17,17,55,16,16,
        23,24,24,20,25,25,19,17,17,
        8,26,26,48,18,18,20,25,25,
        50,27,27,21,22,22,7,20,20,
        5,28,28,22,29,29,21,22,22,
        25,30,30,23,24,24,56,23,23,
        26,31,31,8,26,26,23,24,24,
        27,32,32,49,33,33,8,26,26,
        51,34,34,5,28,28,50,27,27,
        5,28,28,30,35,35,63,36,36,
        59,37,37,26,31,31,25,30,30,
        31,38,38,27,32,32,26,31,31,
        9,39,39,24,40,40,27,32,32,
        52,41,41,29,42,42,51,34,34,
        33,43,43,30,35,35,29,42,42,
        34,44,44,31,38,38,59,37,37,
        35,45,45,9,39,39,31,38,38,
        10,46,46,28,47,47,9,39,39,
        53,48,48,33,43,43,52,41,41,
        37,49,49,60,50,50,33,43,43,
        38,51,51,35,45,45,34,44,44,
        39,52,52,10,46,46,35,45,45,
        10,46,46,36,53,53,32,54,54,
        53,48,48,41,55,55,37,49,49,
        41,55,55,61,56,56,37,49,49,
        42,57,57,39,52,52,38,51,51,
        39,52,52,44,58,58,45,59,59,
        45,59,59,40,60,60,36,53,53,
        11,3,3,41,55,55,54,61,61,
        12,2,2,62,62,62,41,55,55,
        6,8,8,43,63,63,42,57,57,
        43,63,63,13,10,10,44,58,58,
        13,10,10,40,60,60,44,58,58,
        47,1,1,2,4,4,12,2,2,
        2,4,4,3,15,15,57,5,5,
        58,6,6,15,9,9,1,7,7,
        15,9,9,16,11,11,13,10,10,
        16,11,11,14,19,19,46,12,12,
        47,1,1,17,21,21,18,13,13,
        2,4,4,18,13,13,4,14,14,
        55,16,16,19,17,17,15,9,9,
        19,17,17,20,25,25,16,11,11,
        16,11,11,20,25,25,48,18,18,
        7,20,20,21,22,22,18,13,13,
        21,22,22,22,29,29,4,14,14,
        56,23,23,23,24,24,19,17,17,
        23,24,24,8,26,26,20,25,25,
        8,26,26,49,33,33,48,18,18,
        50,27,27,5,28,28,21,22,22,
        5,28,28,63,36,36,22,29,29,
        25,30,30,26,31,31,23,24,24,
        26,31,31,27,32,32,8,26,26,
        27,32,32,24,40,40,49,33,33,
        51,34,34,29,42,42,5,28,28,
        5,28,28,29,42,42,30,35,35,
        59,37,37,31,38,38,26,31,31,
        31,38,38,9,39,39,27,32,32,
        9,39,39,28,47,47,24,40,40,
        52,41,41,33,43,43,29,42,42,
        33,43,43,60,50,50,30,35,35,
        34,44,44,35,45,45,31,38,38,
        35,45,45,10,46,46,9,39,39,
        10,46,46,32,54,54,28,47,47,
        53,48,48,37,49,49,33,43,43,
        37,49,49,61,56,56,60,50,50,
        38,51,51,39,52,52,35,45,45,
        39,52,52,45,59,59,10,46,46,
        10,46,46,45,59,59,36,53,53,
        53,48,48,54,61,61,41,55,55,
        41,55,55,62,62,62,61,56,56,
        42,57,57,43,63,63,39,52,52,
        39,52,52,43,63,63,44,58,58,
        45,59,59,44,58,58,40,60,60,
        11,3,3,12,2,2,41,55,55,
        12,2,2,57,5,5,62,62,62,
        6,8,8,1,7,7,43,63,63,
        43,63,63,1,7,7,13,10,10,
        13,10,10,46,12,12,40,60,60])

    var texCoorIndicesList = []
    var normalIndicesList = []
    var triangleIndicesList = []
    for (let i = 0; i < indices.length / 3; i++) {
        triangleIndicesList.push(indices[i * 3] - 1)
        texCoorIndicesList.push(indices[i * 3 + 1] - 1)
        normalIndicesList.push(indices[i * 3 + 2] - 1)
    }

    var texCoordsList = []
    for (let i = 0; i < vertexPos.length / 3; i++) {
        texCoordsList.push(0)
        texCoordsList.push(0)
    }

    for (let i = 0; i < texCoorIndicesList.length; i++) {
        let vertIndex = triangleIndicesList[i]
        let texCoordIndex = texCoorIndicesList[i]
        texCoordsList[vertIndex * 2] = vertexTextureCoordsRaw[texCoordIndex * 2 ]
        texCoordsList[vertIndex * 2 + 1] = vertexTextureCoordsRaw[texCoordIndex * 2 + 1]
    }

    var normalsList = []
    for (let i = 0; i < vertexPos.length / 3; i++) {
        normalsList.push(0)
        normalsList.push(0)
        normalsList.push(0)
    }

    for (let i = 0; i < texCoorIndicesList.length; i++) {
        let vertIndex = triangleIndicesList[i]
        let normalsIndex = normalIndicesList[i]
        normalsList[vertIndex * 3] = vertexNormalsRaw[normalsIndex * 3 ]
        normalsList[vertIndex * 3 + 1] = vertexNormalsRaw[normalsIndex * 3 + 1]
        normalsList[vertIndex * 3 + 2] = vertexNormalsRaw[normalsIndex * 3 + 2]
    }

    var vertexTextureCoords = new Float32Array(texCoordsList)
    var vertexNormals = new Float32Array(normalsList)


    var triangleIndices = new Uint8Array(triangleIndicesList); // back
    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = vertexPos.length/3;

    // a buffer for normals
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = vertexPos.length/3;

    // a buffer for textures
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = vertexPos.length/3;

    var indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, triangleIndices, gl.STATIC_DRAW);

    // Set up texture
    var texture1 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture1);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image1 = new Image();

    var texture2 = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, texture2);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    var image2 = new Image();

    function initTextureThenDraw()
    {
      image1.onload = function() { loadTexture(image1,texture1); };
      image1.crossOrigin = "anonymous";
      image1.src = "https://i.imgur.com/4j2hO8o.jpeg";

      image2.onload = function() { loadTexture(image2,texture2); };
      image2.crossOrigin = "anonymous";
      image2.src = "https://farm6.staticflickr.com/5726/30206830053_87e9530b48_b.jpg";

      window.setTimeout(draw,200);
    }

    function loadTexture(image,texture)
    {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // Option 1 : Use mipmap, select interpolation mode
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

      // Option 2: At least use linear filters
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Optional ... if your shader & texture coordinates go outside the [0,1] range
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    }
    // Scene (re-)draw routine
    function draw() {

        // Translate slider values to angles in the [-pi,pi] interval
        var x = slider1.value
        var angle1 = slider2.value*0.01*Math.PI;
        var angle2 = slider3.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [300,x,300];
        var target = [0,0,0];
        var up = [0,1,0];

        var tModel = mat4.create();
        mat4.fromScaling(tModel,[100,100,100]);
        mat4.rotate(tModel,tModel,angle1,[0,1,0]);


        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);
         mat4.rotate(tModel,tModel,angle2,[1,0,0]);

        var tCamera = mat4.create();
        mat4.lookAt(tCamera, eye, target, up);

        var tProjection = mat4.create();
        mat4.perspective(tProjection,Math.PI/4,1,10,1000);

        var tMV = mat4.create();
        var tMVn = mat3.create();
        var tMVP = mat4.create();
        mat4.multiply(tMV,tCamera,tModel); // "modelView" matrix
        mat3.normalFromMat4(tMVn,tMV);
        mat4.multiply(tMVP,tProjection,tMV);

        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVmatrix,false,tMV);
        gl.uniformMatrix3fv(shaderProgram.MvertexNormalmatrix,false,tMVn);
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);

        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, triangleNormalBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        // gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        // gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
        //   gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
        gl.vertexAttribPointer(shaderProgram.texcoordAttribute, textureBuffer.itemSize,
          gl.FLOAT, false, 0, 0);

	    // Bind texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, texture2);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, triangleIndices.length, gl.UNSIGNED_BYTE, 0);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input", draw);
    initTextureThenDraw();
}

window.onload=start;
