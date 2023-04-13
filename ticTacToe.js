var currentPlayer = "X";
var turnHeader = $("#turn-header");
var alertContainer = $("#alert-container");

$(".cell").click(function() {
  var cell = $(this);
  if (cell.text() === "") {
    cell.text(currentPlayer);
    if (checkForWinner()) {
      showAlert(currentPlayer + " wins!");
    } else if (checkForDraw()) {
      showAlert("Tie Game!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnHeader.text("Player " + currentPlayer + "'s turn");
    }
  }
});

$("#restart-button").click(function() {
  resetGame();
});

function checkForWinner() {
  return (
    checkRow(0, 1, 2) || 
    checkRow(3, 4, 5) || 
    checkRow(6, 7, 8) || 
    checkRow(0, 3, 6) || 
    checkRow(1, 4, 7) || 
    checkRow(2, 5, 8) || 
    checkRow(0, 4, 8) || 
    checkRow(2, 4, 6)
  );
}

function checkRow(a, b, c) {
  return (
    $("#cell-" + a).text() !== "" && 
    $("#cell-" + a).text() === $("#cell-" + b).text() && 
    $("#cell-" + b).text() === $("#cell-" + c).text()
  );
}

function checkForDraw() {
  for (var i = 0; i < 9; i++) {
    if ($("#cell-" + i).text() === "") {
      return false;
    }
  }
  return true;
}

function resetGame() {
  for (var i = 0; i < 9; i++) {
    $("#cell-" + i).text("");
  }
  currentPlayer = "X";
  turnHeader.text("Player X's turn");
  alertContainer.empty();
}

function showAlert(message) {
  var alert = $("<div>")
    .addClass("alert alert-success")
    .text(message);
  alertContainer.append(alert);
  setTimeout(function() {
    alert.remove();
  }, 3000);
}