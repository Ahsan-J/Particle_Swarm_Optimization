let X = {
    min:-2.00,
    max:2.00
}, Y = {
    min:-1.00,
    max:3.00
};

function Particle(arg1,arg2){
    //public init wiith this
    this.toString = function(){
        return "x: " + this.x + " ; " + "y: " + this.y + "-->" + this.fitness;
    }
    this.updateFitness = function(){
        this.fitness = calculateFitness(this.x,this.y);
    }
    //private init with var
    var calculateFitness = function(x,y){
        return (100 * Math.pow((Math.pow(x,2) - y),2) + Math.pow(1-x, 2));
    }
    this.getX  = function(){
        return this.x;
    }
    this.getY = function(){
        return this.y;
    }
    this.setX = function(x){
        this.x = x;
    }
    this.setY = function(y){
        this.y = y;
    }
    //constructors with Param validations
    if((typeof arg1=="number") && (typeof arg2 == "number")){
        if(arg1>=X.min&&arg1<=X.max){
            this.x = arg1;
        }
        if(arg2>Y.min&&arg2<Y.max){
            this.y = arg2;
        }
        this.updateFitness();
    }
    if((typeof arg1 == "undefined") &&(typeof arg2 == "undefined")){
        this.x = 0.0;
        this.y = 0.0;
        this.fitness = 0.0;
    }
    if((typeof arg1 == "object")&&(typeof arg2 == "undefined")){
        if(arg1.x>=X.min&&arg1.x<=X.max){
            this.x = arg1.x;
        }
        if(arg1.y>=Y.min&&arg1.y<=Y.max){
            this.y = arg1.y;
        }
        this.updateFitness();
    }
}

function start(){
    let generation=1;
    let gBest,lBest,p,v,pBest;
    
    p = initParticle(20)
    v = initVelocity(p.length);
    pBest = initVelocity(p.length);

    gBest = new Particle();
    lBest = new Particle();    

    $('#terminal').empty();
    while(generation<=5000){
        for(var i=0;i<p.length;i++){

            v[i].x = v[i].x + ( 2 * Math.random() * (pBest[i].x - p[i].x)) + ( 2 * Math.random() * (gBest.x - p[i].x));
            v[i].y = v[i].y + ( 2 * Math.random() * (pBest[i].y - p[i].y)) + ( 2 * Math.random() * (gBest.y - p[i].y));
            
            if((p[i].x+v[i].x)>=X.min&&(p[i].x+v[i].x)<=X.max){
                p[i].x = p[i].x + v[i].x;
            }
            if((p[i].y+v[i].y)>=Y.min&&(p[i].y+v[i].y)<=Y.max){
                p[i].y = p[i].y + v[i].y;
            }
            
            p[i].updateFitness();

            if(pBest[i].fitness<p[i].fitness){
                // console.log(pBest[i].fitness+"<"+p[i].fitness);
                pBest[i] = new Particle(p[i]);
            }
            else{
                p[i]=new Particle(pBest[i]);
            }
            // console.log(pBest[i].toString());            
        }
        lBest = findBest(p);
        println("Generation: "+generation+"--> "+lBest.fitness);
        if(gBest.fitness<lBest.fitness){
            console.log(gBest.fitness+"<"+lBest.fitness);
            gBest = new Particle(lBest);
        }
        else{
            console.log(gBest.fitness+">"+lBest.fitness);
        }
        generation++;
    }
}
function println(text){
    $('#terminal').append('<span>'+text+'</span> <br/>');
}
function print(text){
    $('#terminal').append('<span>'+text+'</span>');
}
function findBest(p){
    let best = new Particle();
    for(var i=0;i<p.length;i++){
        if(best.fitness<p[i].fitness){
            best = p[i];
        }
    }
    return best;
}
function initParticle(length){
    let p = [];
    for(var i=0;i<length;i++){
        let x = X.min + (X.max - X.min) * Math.random();
        let y = Y.min + (Y.max - Y.min) * Math.random();
        p.push(new Particle(x,y));
    }
    return p;
}
function initVelocity(length){
    let p = [];
    for(var i=0;i<length;i++){
        p.push(new Particle());
    }
    return p;
}
