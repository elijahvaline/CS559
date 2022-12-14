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

    // Data ...

    // vertex positions
    var vertexPos = new Float32Array(
        [1.250000,0.000000,0.000000,
        1.077254,0.237764,0.000000,
        0.797746,0.146946,0.000000,
        0.797746,-0.146946,0.000000,
        1.077254,-0.237764,0.000000,
        0.957555,0.000000,-0.803485,
        0.825225,0.237764,-0.692446,
        0.611109,0.146946,-0.512781,
        0.611109,-0.146946,-0.512781,
        0.825225,-0.237764,-0.692446,
        0.217060,0.000000,-1.231010,
        0.187063,0.237764,-1.060888,
        0.138527,0.146946,-0.785626,
        0.138527,-0.146946,-0.785626,
        0.187063,-0.237764,-1.060888,
        -0.625000,0.000000,-1.082532,
        -0.538627,0.237764,-0.932930,
        -0.398873,0.146946,-0.690868,
        -0.398873,-0.146946,-0.690868,
        -0.538627,-0.237764,-0.932930,
        -1.174616,0.000000,-0.427526,
        -1.012288,0.237764,-0.368443,
        -0.749636,0.146946,-0.272845,
        -0.749636,-0.146946,-0.272845,
        -1.012288,-0.237764,-0.368443,
        -1.174616,0.000000,0.427525,
        -1.012288,0.237764,0.368443,
        -0.749636,0.146946,0.272845,
        -0.749636,-0.146946,0.272845,
        -1.012288,-0.237764,0.368443,
        -0.625000,0.000000,1.082532,
        -0.538627,0.237764,0.932930,
        -0.398873,0.146946,0.690868,
        -0.398873,-0.146946,0.690868,
        -0.538627,-0.237764,0.932930,
        0.217060,0.000000,1.231010,
        0.187063,0.237764,1.060888,
        0.138527,0.146946,0.785626,
        0.138527,-0.146946,0.785626,
        0.187063,-0.237764,1.060888,
        0.957555,0.000000,0.803485,
        0.825225,0.237764,0.692446,
        0.611109,0.146946,0.512781,
        0.611109,-0.146946,0.512781,
        0.825225,-0.237764,0.692446]);

    // vertex normals
    var vertexNormals = new Float32Array(
        [ 0.7761, 0.5638, -0.2825,
         -0.3071, 0.9451, 0.1118,
         -0.9397, 0.0000, 0.3420,
         -0.3071, -0.9451, 0.1118,
         0.7761, -0.5638, -0.2825,
         0.4129, 0.5638, -0.7152,
         -0.1634, 0.9451, 0.2830,
         -0.5000, 0.0000, 0.8660,
         -0.1634, -0.9451, 0.2830,
         0.4129, -0.5638, -0.7152,
         -0.1434, 0.5638, -0.8133,
         0.0567, 0.9451, 0.3218,
         0.1736, 0.0000, 0.9848,
         0.0567, -0.9451, 0.3218,
         -0.1434, -0.5638, -0.8133,
         -0.6327, 0.5638, -0.5309,
         0.2503, 0.9451, 0.2101,
         0.7660, 0.0000, 0.6428,
         0.2503, -0.9451, 0.2101,
         -0.6327, -0.5638, -0.5309,
         -0.8259, 0.5638, -0.0000,
         0.3268, 0.9451, 0.0000,
         1.0000, 0.0000, 0.0000,
         0.3268, -0.9451, 0.0000,
         -0.8259, -0.5638, -0.0000,
         -0.6327, 0.5638, 0.5309,
         0.2503, 0.9451, -0.2101,
         0.7660, 0.0000, -0.6428,
         0.2503, -0.9451, -0.2101,
         -0.6327, -0.5638, 0.5309,
         -0.1434, 0.5638, 0.8133,
         0.0567, 0.9451, -0.3218,
         0.1736, 0.0000, -0.9848,
         0.0567, -0.9451, -0.3218,
         -0.1434, -0.5638, 0.8133,
         0.4129, 0.5638, 0.7152,
         -0.1634, 0.9451, -0.2830,
         -0.5000, 0.0000, -0.8660,
         -0.1634, -0.9451, -0.2830,
         0.4129, -0.5638, 0.7152,
         0.7761, 0.5638, 0.2825,
         -0.3071, 0.9451, -0.1118,
         -0.9397, 0.0000, -0.3420,
         -0.3071, -0.9451, -0.1118,
         0.7761, -0.5638, 0.2825]);


    // vertex texture coordinates
    var vertexTextureCoords = new Float32Array(
        [0.883936,0.640382,
        0.706975,0.850885,
        0.658192,0.771062,
        0.795230,0.610698,
        0.615978,0.697771,
        0.715726,0.581801,
        0.477930,0.343316,
        0.376567,0.396068,
        0.315745,0.345875,
        0.460127,0.265017,
        0.251172,0.287806,
        0.446142,0.178725,
        0.174739,0.225846,
        0.425953,0.082681,
        0.435987,0.898058,
        0.449920,0.805543,
        0.464745,0.722115,
        0.332830,0.494057,
        0.256501,0.496349,
        0.170887,0.494319,
        0.072662,0.496603,
        0.197872,0.760470,
        0.267906,0.698459,
        0.332707,0.643967,
        0.368046,0.593800,
        0.311881,0.646818,
        0.245499,0.701581,
        0.172518,0.767301,
        0.103722,0.502126,
        0.197217,0.499633,
        0.281804,0.499544,
        0.464067,0.647318,
        0.454293,0.725982,
        0.438077,0.811638,
        0.424124,0.909229,
        0.197843,0.243776,
        0.271007,0.302056,
        0.335761,0.356441,
        0.575393,0.630206,
        0.617015,0.697620,
        0.658807,0.774294,
        0.710295,0.858801,
        0.436276,0.106666,
        0.454824,0.198374,
        0.469418,0.281804,
        0.650070,0.548145,
        0.724239,0.573238,
        0.804978,0.605079,
        0.898681,0.636763,
        0.707133,0.154654,
        0.662475,0.236880,
        0.620146,0.310240,
        0.654517,0.440163,
        0.725932,0.411142,
        0.807230,0.382947,
        0.898680,0.346230,
        0.883936,0.365370,
        0.796905,0.399693,
        0.717388,0.428718,
        0.587519,0.357740,
        0.621413,0.288682,
        0.664461,0.214303,
        0.709886,0.127358]);

    // element index array
    var triangleIndices = new Uint8Array(
        [1,1,1,6,2,1,7,3,1,2,4,1,
        2,4,2,7,3,2,8,5,2,3,6,2,
        3,7,3,8,8,3,9,9,3,4,10,3,
        4,10,4,9,9,4,10,11,4,5,12,4,
        5,12,5,10,11,5,6,13,5,1,14,5,
        6,2,6,11,15,6,12,16,6,7,3,6,
        7,3,7,12,16,7,13,17,7,8,5,7,
        8,8,8,13,18,8,14,19,8,9,9,8,
        9,9,9,14,19,9,15,20,9,10,11,9,
        10,11,10,15,20,10,11,21,10,6,13,10,
        11,15,11,16,22,11,17,23,11,12,16,11,
        12,16,12,17,23,12,18,24,12,13,17,12,
        13,18,13,18,25,13,19,26,13,14,19,13,
        14,19,14,19,26,14,20,27,14,15,20,14,
        15,20,15,20,27,15,16,28,15,11,21,15,
        16,22,16,21,29,16,22,30,16,17,23,16,
        17,23,17,22,30,17,23,31,17,18,24,17,
        18,25,18,23,32,18,24,33,18,19,26,18,
        19,26,19,24,33,19,25,34,19,20,27,19,
        20,27,20,25,34,20,21,35,20,16,28,20,
        21,29,21,26,36,21,27,37,21,22,30,21,
        22,30,22,27,37,22,28,38,22,23,31,22,
        23,32,23,28,39,23,29,40,23,24,33,23,
        24,33,24,29,40,24,30,41,24,25,34,24,
        25,34,25,30,41,25,26,42,25,21,35,25,
        26,36,26,31,43,26,32,44,26,27,37,26,
        27,37,27,32,44,27,33,45,27,28,38,27,
        28,39,28,33,46,28,34,47,28,29,40,28,
        29,40,29,34,47,29,35,48,29,30,41,29,
        30,41,30,35,48,30,31,49,30,26,42,30,
        31,43,31,36,50,31,37,51,31,32,44,31,
        32,44,32,37,51,32,38,52,32,33,45,32,
        33,46,33,38,53,33,39,54,33,34,47,33,
        34,47,34,39,54,34,40,55,34,35,48,34,
        35,48,35,40,55,35,36,56,35,31,49,35,
        36,50,36,41,57,36,42,58,36,37,51,36,
        37,51,37,42,58,37,43,59,37,38,52,37,
        38,53,38,43,60,38,44,61,38,39,54,38,
        39,54,39,44,61,39,45,62,39,40,55,39,
        40,55,40,45,62,40,41,63,40,36,56,40,
        41,57,41,1,1,41,2,4,41,42,58,41,
        42,58,42,2,4,42,3,6,42,43,59,42,
        43,60,43,3,7,43,4,10,43,44,61,43,
        44,61,44,4,10,44,5,12,44,45,62,44,
        45,62,45,5,12,45,1,14,45,41,63,45]); // back

    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = triangleIndices.length;

    // a buffer for normals
    var triangleNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexNormals, gl.STATIC_DRAW);
    triangleNormalBuffer.itemSize = 3;
    triangleNormalBuffer.numItems = triangleIndices.length;

    // a buffer for colors


    // a buffer for textures
    var textureBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexTextureCoords, gl.STATIC_DRAW);
    textureBuffer.itemSize = 2;
    textureBuffer.numItems = triangleIndices.length;

    // a buffer for indices

    for (let i = 0; i < triangleIndices.length; i++){
      triangleIndices[i] = triangleIndices[i] - 1;
    }

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
        // mat4.rotate(tModel,tModel,angle2,[1,0,0]);

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
        gl.drawElements(gl.POINTS, triangleIndices.length, gl.UNSIGNED_BYTE, 0);

    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input", draw);
    initTextureThenDraw();
}

window.onload=start;
