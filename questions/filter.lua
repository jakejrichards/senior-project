local List = require("pandoc.List")
local F = require("F")

function answerChoiceHtml(name, text, feedback, questionId)
  return F[[
    <input type="radio" name="{questionId}" value="{name}" data-text="{text}" data-feedback="{feedback}" />
    <label for="{name}">{text}</label>
  ]];
end

function questionButtonsHtml()
  return F[[
    <button class="toggle-hint">View Hint</button>
    <button disabled class="submit">Submit</button>
  ]];
end

if FORMAT:match "html" then
  function Div (el)
    class = el.classes[1]
    if class == "answer-choice" then
      questionId = el.attr.attributes.questionId
      name = el.attr.attributes.name
      text = el.attr.attributes.text
      feedback = el.attr.attributes.feedback
      table.insert(el.content, pandoc.RawBlock("html", answerChoiceHtml(name, text, feedback, questionId)))
      return el
    elseif class == "question" then
      content = el.content

      id = el.identifier
      text = id .. ". " .. el.attr.attributes.text
      textPara = pandoc.Para(pandoc.Str(text))
      table.insert(el.content, 1, textPara)

      buttonsDiv = pandoc.Div(pandoc.RawBlock("html", questionButtonsHtml()))
      buttonsDiv.classes[1] = "buttons"
      table.insert(el.content, buttonsDiv)
      return el
    else
      return el
    end
  end
end
