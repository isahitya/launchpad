let tileCounter = 1;
let categoryCounter = 1;

function getDashboardTiles() {
    return [{
            id: "t_" + (tileCounter++),
            name: "AZ Lister",
            iconURL: "",
            description: "Show availability zone mappings to account"
        },
        {
            id: "t_" + (tileCounter++),
            name: "Billing Activity",
            iconURL: "",
            description: "Service Owner Tool: Recent Billing Activity"
        },
        {
            id: "t_" + (tileCounter++),
            name: "Customer Resources",
            iconURL: "",
            description: "Provides a cross region overview of curtomer resources"
        },
        {
            id: "t_" + (tileCounter++),
            name: "Fraud Tools",
            iconURL: "",
            description: "Verify Account Status and Containment Scores"
        }
    ]
}

function getStorageAndCDNTiles() {
    return [{
            id: "t_" + (tileCounter++),
            name: "CloudFront",
            iconURL: "",
            description: "CloudFront search for customer distributions"
        },
        {
            id: "t_" + (tileCounter++),
            name: "Import/Export",
            iconURL: "",
            description: "Import/Export dashboard (not V/M Import/Export)"
        },
        {
            id: "t_" + (tileCounter++),
            name: "S3 Buckets",
            iconURL: "",
            description: "Redirect to the S3 SNF to show account's S3 Buckets"
        },
        {
            id: "t_" + (tileCounter++),
            name: "Storage Gateway",
            iconURL: "",
            description: "K2 scripts that outputs SG information"
        }
    ]
}

function getDatabaseTiles() {
    return [{
            id: "t_" + (tileCounter++),
            name: "DynamoDB",
            iconURL: "",
            description: "DynamoDB operational console"
        },
        {
            id: "t_" + (tileCounter++),
            name: "DynamoDB-Heatmaps",
            iconURL: "",
            description: "DynamoDB-Heatmaps console"
        },
        {
            id: "t_" + (tileCounter++),
            name: "ElastiCache",
            iconURL: "",
            description: "ElastiCache operational console"
        },
        {
            id: "t_" + (tileCounter++),
            name: "RDS",
            iconURL: "",
            description: "RDS operations tool, cross region customer view"
        }
    ]
}

function genK2Scripts() {
    let dashboard = {
        id: "k_" + (categoryCounter++),
        name: "Dashboard",
        iconURL: "/k2scipts/dashboard.png",
        tiles: getDashboardTiles()
    }
    let storageAndCDN = {
        id: "k_" + (categoryCounter++),
        name: "Storage & CDN",
        iconURL: "/k2scipts/storageAndCDN.png",
        tiles: getStorageAndCDNTiles()
    }
    let database = {
        id: "k_" + (categoryCounter++),
        name: "Database",
        iconURL: "/k2scipts/database.png",
        tiles: getDatabaseTiles()
    }
    return [dashboard, storageAndCDN, database]
}

module.exports.genK2Scripts = genK2Scripts;