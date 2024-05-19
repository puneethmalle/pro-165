
AFRAME.registerComponent("enemy", {
    init: function () {        
        setInterval(this.shootEnemyMonster, 2000)
    },
    shootEnemyMonster: function () {
        var scene = document.querySelector("#scene") 
        var enemyMonster = document.querySelectorAll(".enemy")    
        for (var i = 0; i < enemyMonster.length; i++) {
        var  bullet = document.createElement("a-entity")
         bullet.setAttribute("class"," bullet")
         bullet.setAttribute("gltf-model", "./models/ bullet/scene.gltf")
         bullet.setAttribute("dynamic-body", { mass: 0 })
        var pos=enemyMonster[i].getAttribute("position")
         bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
        })
         bullet.setAttribute("scale", {
            x: 0.05,
            y: 0.05,
            z: 0.05,
        })
        scene.appendChild( bullet)      
        var position1 = new THREE.Vector3()  
        var position2 = new THREE.Vector3()  
        var player =  document.querySelector("#weapon").object3D
        var enemy_bullet =  bullet.object3D  
        player.getWorldPosition(position1)  
        enemy_bullet.getWorldPosition(position2)  
        var direction = new THREE.Vector3()  
        direction.subVectors(position1, position2).normalize()  
        bullet.setAttribute("velocity", direction.multiplyScalar(20))  
        var element = document.querySelector("#countLife")  
        var playerLife = parseInt(element.getAttribute("text").value)  
         bullet.addEventListener("collide", function (e) {         
            if (e.detail.body.el.id === "weapon") {               
                if (playerLife > 0) {
                    playerLife -= 1  
                    element.setAttribute("text", {
                        value: playerLife
                    })  
                }
                if (playerLife <= 0) {
                    var txt = document.querySelector("#over")
                    txt.setAttribute("visible", true)  
                    var El = document.querySelectorAll(".enemy")
                    for (var i = 0 ;  i < El.length; i++) {
                        scene.removeChild(El)
                    }

                }

            }
        })

    }
    },
    

})