document.addEventListener("DOMContentLoaded", function() {
    // DOM Elements
    const areaInput = document.getElementById("area");
    const xCoordInput = document.getElementById("x-coord");
    const yCoordInput = document.getElementById("y-coord");
    const addShapeButton = document.getElementById("add-shape");
    const subtractShapeButton = document.getElementById("subtract-shape");
    const shapesContainer = document.getElementById("shapes-container");
    const noShapesMessage = document.getElementById("no-shapes");
    const totalAreaDisplay = document.getElementById("total-area");
    const centroidXDisplay = document.getElementById("centroid-x");
    const centroidYDisplay = document.getElementById("centroid-y");
    
    // List maker
    let shapes = [];
    let totalArea = 0;
    let weightedXSum = 0;
    let weightedYSum = 0;
    let shapeCounter = 0;
    

    function updateCentroid() {

        const centroidX = totalArea !== 0 ? (weightedXSum / totalArea).toFixed(3) : 0;
        const centroidY = totalArea !== 0 ? (weightedYSum / totalArea).toFixed(3) : 0;
        

        totalAreaDisplay.textContent = Math.abs(totalArea).toFixed(3);
        centroidXDisplay.textContent = centroidX;
        centroidYDisplay.textContent = centroidY;
        

        if (shapes.length > 0) {
            noShapesMessage.style.display = "none";
        } else {
            noShapesMessage.style.display = "block";
        }
    }
    

    function processShape(area, x, y, isAddition) {

        if (isNaN(area) || isNaN(x) || isNaN(y)) {
            alert("Please enter valid numbers for area, X, and Y coordinates.");
            return false;
        }
         if (isAddition) {
            totalArea += area;
            weightedXSum += area * x;
            weightedYSum += area * y;
        } else {
            totalArea -= area;
            weightedXSum -= area * x;
            weightedYSum -= area * y;
        }
        

        shapeCounter++;
        const shapeId = `shape-${shapeCounter}`;
        shapes.push({
            id: shapeId,
            area: area,
            x: x,
            y: y,
            isAddition: isAddition
        });
        
        // Update the display
        updateCentroid();
        
        createShapeElement(shapeId, area, x, y, isAddition);
        
        areaInput.value = "";
        xCoordInput.value = "";
        yCoordInput.value = "";
        
        areaInput.focus();
        
        return true;
    }
    

    function createShapeElement(id, area, x, y, isAddition) {
        const shapeElement = document.createElement("div");
        shapeElement.className = `shape-item ${isAddition ? "added" : "subtracted"}`;
        shapeElement.id = id;
        
        const sign = isAddition ? "+" : "-";
        
        shapeElement.innerHTML = `
            <div class="shape-info">
                <strong>${sign} Shape ${shapeCounter}</strong>
                <p>Area: ${area}, Centroid: (${x}, ${y})</p>
            </div>
            <div class="shape-actions">
                <button class="remove-shape" data-id="${id}">Remove</button>
            </div>
        `;
        

        shapesContainer.appendChild(shapeElement);
        

        shapeElement.querySelector(".remove-shape").addEventListener("click", function() {
            removeShape(id);
        console.log("makeshape");
        });
    }
    

    function removeShape(id) {

        const shapeIndex = shapes.findIndex(shape => shape.id === id);
        
        if (shapeIndex !== -1) {
            const shape = shapes[shapeIndex];
            
            // Undo calc
            if (shape.isAddition) {
                totalArea -= shape.area;
                weightedXSum -= shape.area * shape.x;
                weightedYSum -= shape.area * shape.y;
            } else {
                totalArea += shape.area;
                weightedXSum += shape.area * shape.x;
                weightedYSum += shape.area * shape.y;
            }
            
            // un append
            shapes.splice(shapeIndex, 1);
            
            // Remove 
            document.getElementById(id).remove();
            
            // Update 
            updateCentroid();
        }
    }
    

    addShapeButton.addEventListener("click", function() {
        const area = parseFloat(areaInput.value);
        const x = parseFloat(xCoordInput.value);
        const y = parseFloat(yCoordInput.value);
        processShape(area, x, y, true);
        console.log("add");
    });
    

    subtractShapeButton.addEventListener("click", function() {
        const area = parseFloat(areaInput.value);
        const x = parseFloat(xCoordInput.value);
        const y = parseFloat(yCoordInput.value);
        processShape(area, x, y, false);
        console.log("subtract");
    });
    
    // Initialize 
    updateCentroid();
});
