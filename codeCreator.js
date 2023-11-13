let codeSnippets = document.getElementsByClassName('code-snippet');

const statements = ['for', 'return', 'break', 'if', 'else', 'in', 'foreach', 'while', 'continue'];
const references = ['int', 'bool', 'char', 'float', 'void', 'public', 'private', 'protected', 'class', 'new', 'object', 'this', 'true', 'false', 'inline', 'virtual', 'namespace', 'this', 'where'];


for (let i = 0; i < codeSnippets.length; i++)
{
    let code = codeSnippets[i].innerHTML;
    code = code.split(' ');
    let isCommented =false
    for (let j = 0; j < code.length; j++)
    {
        if (code[j] == '//')
        {
            code[j] = '<a style="color: rgb(87, 166, 74);">' + code[j] + '</a>';
            isCommented = true;
        }
        else if (isCommented && code[j].split(/(\n)/)[1] == "\n")
        {
            let lastIndex = code[j].split(/(\n)/)[2];
            if (references.includes(code[j].split(/(\n)/)[2]))
            {
                lastIndex  = '<a style="color: rgb(86, 156, 214);">' + code[j].split(/(\n)/)[2] + '</a>';
            }
            if (statements.includes(code[j].split(/(\n)/)[2]))
            {
                lastIndex  = '<a style="color: rgb(216, 160, 223);">' + code[j].split(/(\n)/)[2] + '</a>';
            }
            code[j] ='<a style="color: rgb(87, 166, 74);">' + code[j].split(/(\n)/)[0] + '</a>' + code[j].split(/(\n)/)[1] + lastIndex;
            
            isCommented = false;
        }
        else if (isCommented)
        {
            code[j] = '<a style="color: rgb(87, 166, 74);">' + code[j] + '</a>';
        }
        else 
        {
            let codeSplit = code[j].split(/([&<;>;\:\[\]\(\)\.\{\}\*])/);
            for (let k = 0; k < codeSplit.length; k++)
            {
                codeLine = codeSplit[k].split(/(\n)/);
                if(codeSplit[k].split(/(")/)[1] == '"')
                {
                    codeSplit[k] = '<a style="color: rgb(214, 157, 133);">' + codeSplit[k] + '</a>';
                    continue;
                }
                if (codeLine.length > 1)
                {
                    for (let l = 0; l < codeLine.length; l++)
                    {
                        if (references.includes(codeLine[l]) && !isCommented)
                        {
                            codeLine[l] = '<a style="color: rgb(86, 156, 214);">' + codeLine[l] + '</a>';
                        }
                        else if (statements.includes(codeLine[l]) && !isCommented)
                        {
                            codeLine[l] = '<a style="color: rgb(216, 160, 223);">' + codeLine[l] + '</a>';
                        }
                    }
                    codeSplit[k] = codeLine.join('');
                }
                if (references.includes(codeSplit[k]) && !isCommented)
                {
                    codeSplit[k] = '<a style="color: rgb(86, 156, 214);">' + codeSplit[k] + '</a>';
                }
                if (statements.includes(codeSplit[k]) && !isCommented)
                {
                    codeSplit[k] = '<a style="color: rgb(216, 160, 223);">' + codeSplit[k] + '</a>';
                }
            }
            
            codeSplit = codeSplit.join('');
            code[j] = codeSplit;
        }
    }
    code = code.join(' ');
    codeSnippets[i].innerHTML = code;
}

