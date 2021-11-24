const runCode = document.querySelector('.run');
const resetCode = document.querySelector('.reset');

var editor = ace.edit("editor");

editor.setTheme("ace/theme/dracula");
editor.session.setMode("ace/mode/javascript");
ace.require("ace/ext/language_tools");


editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
editor.clearSelection();
/* -------------------------------------OPEN FILE-----------------------------------------*/


var modeHolder;
$(document).ready(function () {
  $("select.languages").change(function () {
    let selectedItem = $(this).children("option:selected").text();
    if (selectedItem == 'Java') {
      modeHolder = "java";
    }
    else if (selectedItem == 'Python') {
      modeHolder = "py";
    }
    else if (selectedItem == 'C++') {
      modeHolder = "cpp";
    }
    else if (selectedItem == 'C') {
      modeHolder = "c"
    }
    else if (selectedItem == 'Swift') {
      modeHolder = "swift"
    }
    console.log("lang: " + modeHolder)

  });
});
///////////////////////////////////////////////////////////////////////////////

function executeCode() {

  

  if(modeHolder ==undefined){
    alert("Please select programming lnaguage first!")
  }

  else{
   var input_user = document.getElementById('input').value;
    const response = new XMLHttpRequest();
    var data = JSON.stringify({
      "code": editor.getValue(),
      "language": modeHolder,
      "input": input_user
  
    });
    console.log("****"+input_user);
    document.getElementById('output').innerHTML = "Loading..."
    response.open("POST", 'https://cors-anywhere-jaagrav.herokuapp.com/https://codexweb.netlify.app/.netlify/functions/enforceCode')
    response.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    response.send(data);
    response.onload = (e) => {
      document.getElementById('output').innerHTML = ""
      console.log(modeHolder)
      console.log(response.response); // printing the output
    
      var x = JSON.parse(response.response);
      document.getElementById('output').innerHTML = x.output;
    }
  }
}
////////////////////////////////////////////////////////////////////////////////

// Function to change the mode of the editor as a different language is selected dynamically
function changeLanguage() {
  var x = document.getElementById("mode");
 
  var modeValue = x.options[x.selectedIndex].value;
  if (modeValue == "c") {
    editor.session.setMode("ace/mode/c_cpp");
    editor.setValue("#include <stdio.h>\n\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n");
    editor.clearSelection();
    document.getElementById('langExt').innerHTML = "c";
    console.log("C");
  
    
  }
  if (modeValue == "c++") {
    editor.session.setMode("ace/mode/c_cpp");
    editor.setValue("#include <iostream>\nusing namespace std;\n\nint main() {\n    // Complete the code.\n    return 0;\n}\n");
    editor.clearSelection();
    document.getElementById('langExt').innerHTML = "cpp";
    console.log("C++");
  }
  if (modeValue == "python") {
    editor.session.setMode("ace/mode/python");
    editor.setValue("print('hello world')");
    editor.clearSelection();
    document.getElementById('langExt').innerHTML = "py";
    console.log("python");

  }
  if (modeValue == "java") {
    editor.session.setMode("ace/mode/java");
    editor.setValue("import java.io.*;\n\nclass Main {\n\n    public static void main(String[] args) {\n        // Your code goes here\n   }\n}\n");
    editor.clearSelection();
    document.getElementById('langExt').innerHTML = "java";
    console.log("Java");

  }
   if (modeValue == "Swift") {
    editor.session.setMode("ace/mode/swift");
    editor.setValue('var myString = "Hello, World!";' 
    +'\nprint(myString)');

    editor.clearSelection();
    document.getElementById('langExt').innerHTML = "swift";

  }
}
$(document).ready(function () {
  $('.selectpicker').selectpicker();
  $('[data-toggle="tooltip"]').tooltip();
});
let count = 1;


function elemTarget(e) {
  e = e || window.event;
  console.log("testing...");
  e.preventDefault();
  return e.target;
}

// document.addEventListener("click", (e) => {
//   let elem = elemTarget(e);
//  
//   if (elem.id == 'download') {
  
//     saveText();
    
//   }
// });

function saveText() {
  let data = editor.getValue();
  console.log("saveText()");
  if (modeHolder != "java" && modeHolder != "py" && modeHolder != "cpp" && modeHolder != "c" && modeHolder != "swift") {
    console.log('No language selected')
  }
  else {
    let file = 'unititled-' + count + '.' + modeHolder;
    console.log("Language extension: " + modeHolder);
    count++;

    let link = document.createElement('a');
    link.download = file;
    let blob = new Blob(['' + data + ''], {
      type: 'text/plain'
    });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
}

function openCode(files) {
  var file = files[0]
  if (!file) return;
  var modelist = ace.require("ace/ext/modelist")
  var modeName = modelist.getModeForPath(file.name).mode 
  editor.session.setMode(modeName)
  reader = new FileReader();
  reader.onload = function() {
      editor.session.setValue(reader.result)
  }  
  reader.readAsText(file) 
}


//change the theme
function changeThemes() {
  var x = document.getElementById("themes");
  var modeValue = x.options[x.selectedIndex].value;
  if (modeValue == "twilight") {
    editor.setTheme("ace/theme/twilight");
  }
  if (modeValue == "monokai") {
    editor.setTheme("ace/theme/monokai");
  }
  if (modeValue == "dracula") {
    editor.setTheme("ace/theme/dracula");

  }
  if (modeValue == "eclipse") {
    editor.setTheme("ace/theme/eclipse");
  }
  if (modeValue == "ambiance") {
    editor.setTheme("ace/theme/ambiance");
  }
  if (modeValue == "chaos") {
    editor.setTheme("ace/theme/chaos");
  }
}
$(document).ready(function () {
  $('.selectpicker').selectpicker();
  $('[data-toggle="tooltip"]').tooltip();
});


runCode.addEventListener('click', () => {
  const userCode = editor.getValue();  //get the code from user
  try {
    var run = new Function(userCode)();

  } catch {
    console.error(err);
  }
});



document.getElementById('editor').style.fontSize = '14px';
resetCode.addEventListener("click", () => {
  editor.setValue(" Select the language first");
})





