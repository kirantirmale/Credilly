

// Make data 

const carBrandsData = {
	American: ["Archer", "Ben Ford", "BMW", "BUICK", "CADILLAC", "CHEROKEE", "CHEVROLET", "CHRYSLER", "DODGE", "FORD", "Ford Lincoln", "General Motors", "GMC", "HAMMER", "HINO", "HUMMER", "Indian", "INTERNATIONAL", "JEEP", "JMC", "KTM", "LINCOLN", "LUCID", "MERCURY", "MOTORBIKE", "MOTORCYCLE", "Mustang", "OLDSMOBILE", "PLYMOUTH", "PONTIAC", "RAM", "RAM MOTORS", "Ranger", "Rivian", "Sila", "SONOMA", "SUZUKI", "TESLA", "WRANGLER", "YAMAHA"],
	China: ["BAIC", "Bajaj", "BLK", "BYD", "CFMOTO", "Chang dong", "CHANGAN", "CHERY", "clear", "DONGFENG", "EXEED", "FAW", "FOTON", "GAC", "GEELY", "GENESIS", "GMC", "GREAT WALL", "Guangzhou", "HAVAL", "HONGQI", "Huanghai", "HYUNDAI", "JAC", "JAECOO", "Jbeili", "JETOUR", "JMC", "KING LONG", "LEXUS", "Lynk & Co", "MAXUS", "MG", "OMODA", "SAIC", "SAIC Motor", "SHANGHAI", "SHANGYUNG", "SINOTRUK", "SSANGYONG", "TAM", "VOLKSWAGEN", "YUTONG", "ZHONG YUNG", "ZOOMILON", "ZX AUOTO"],
	// Add other categories...
};
const carBrands = [...new Set(Object.values(carBrandsData).flat())];

export const carOptions = carBrands.map((brand) => ({ value: brand, label: brand }));

// Car Model

const aircraftModelsData = {
	Airbus: ["Airbus A320", "Airbus A330", "Airbus A350", "Airbus A380"],
	Boeing: ["Boeing 737", "Boeing 747", "Boeing 757", "Boeing 777", "Boeing 787"],
	Other: ["Embraer E190", "Bombardier CRJ900", "Cessna 172", "Gulfstream G650"]
};

export const aircraftOptions = [...new Set(Object.values(aircraftModelsData).flat())].map((model) => ({
	value: model,
	label: model
}));


// Estimate 

export const amountOptions = [
    { value: "$100 - $1000", label: "$100 - $1000" },
    { value: "$1000 - $5000", label: "$1000 - $5000" },
    { value: "$5000 - $10,000", label: "$5000 - $10,000" },
    { value: "$10,000+", label: "$10,000+" }
];

// Banks 

export const bankOptions = [
	{ value: "Standard Bank", label: "Standard Bank" },
	{ value: "Standard Chartered", label: "Standard Chartered" },
	{ value: "Barclays", label: "Barclays" },
  ];
  