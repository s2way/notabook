'use strict';
/**
 * controllers for ng-table
 * Simple table with sorting and filtering on AngularJS
 */
var data =[
    {
        "emissao": "2015-08-05T05:49:54 +03:00",
        "valor": "$1,398.42",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-04-06T08:40:00 +03:00",
        "valor": "$1,314.04",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-08-28T10:44:31 +03:00",
        "valor": "$3,718.73",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-01-25T10:24:33 +02:00",
        "valor": "$1,110.91",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-11-01T01:45:00 +02:00",
        "valor": "$3,617.06",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-12-27T05:07:01 +02:00",
        "valor": "$1,363.28",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-03-27T07:34:54 +03:00",
        "valor": "$1,733.61",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-04-01T12:15:13 +03:00",
        "valor": "$3,575.82",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-07-20T11:46:06 +03:00",
        "valor": "$1,214.29",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-10-11T07:50:26 +03:00",
        "valor": "$1,589.05",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-06-15T01:56:35 +03:00",
        "valor": "$2,152.84",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-07-08T05:22:08 +03:00",
        "valor": "$3,252.25",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-07-23T06:32:05 +03:00",
        "valor": "$3,934.36",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-05-19T06:28:02 +03:00",
        "valor": "$3,503.25",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-07-29T08:44:57 +03:00",
        "valor": "$3,380.45",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-10-23T08:22:45 +02:00",
        "valor": "$1,283.60",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-10-08T05:13:25 +03:00",
        "valor": "$3,112.52",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-01-30T03:55:14 +02:00",
        "valor": "$3,734.80",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-12-01T06:54:43 +02:00",
        "valor": "$1,738.35",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-04-25T05:51:11 +03:00",
        "valor": "$1,548.47",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-03-20T07:49:01 +03:00",
        "valor": "$1,749.41",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-07-21T02:19:22 +03:00",
        "valor": "$2,689.10",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-11-27T07:57:01 +02:00",
        "valor": "$1,696.62",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-11-16T08:22:34 +02:00",
        "valor": "$3,007.01",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-04-24T03:32:40 +03:00",
        "valor": "$2,480.47",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-12-08T06:32:45 +02:00",
        "valor": "$2,973.55",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-04-28T10:04:56 +03:00",
        "valor": "$2,624.85",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-09-12T03:59:17 +03:00",
        "valor": "$3,964.16",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-09-22T07:25:50 +03:00",
        "valor": "$2,183.94",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-03-04T02:38:37 +03:00",
        "valor": "$3,134.77",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-05-26T01:53:33 +03:00",
        "valor": "$2,242.90",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-01-30T07:54:50 +02:00",
        "valor": "$2,158.25",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-06-24T11:01:20 +03:00",
        "valor": "$1,737.93",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-07-24T04:24:13 +03:00",
        "valor": "$3,974.22",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-09-29T03:09:31 +03:00",
        "valor": "$3,016.02",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-02-21T08:42:47 +03:00",
        "valor": "$1,176.75",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-06-11T12:14:55 +03:00",
        "valor": "$2,955.35",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-05-31T02:51:51 +03:00",
        "valor": "$1,399.40",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-01-24T03:27:47 +02:00",
        "valor": "$1,185.49",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-01-24T03:12:20 +02:00",
        "valor": "$2,323.36",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-04-22T09:56:18 +03:00",
        "valor": "$3,609.42",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-07-16T01:07:10 +03:00",
        "valor": "$3,983.39",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-08-15T05:32:10 +03:00",
        "valor": "$1,536.71",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-08-26T05:24:28 +03:00",
        "valor": "$2,696.96",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-01-15T02:54:19 +02:00",
        "valor": "$3,879.97",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-05-09T04:08:04 +03:00",
        "valor": "$1,562.58",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-02-05T05:55:09 +02:00",
        "valor": "$1,814.30",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-02-29T10:25:42 +03:00",
        "valor": "$1,973.67",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-03-09T07:49:49 +03:00",
        "valor": "$2,152.04",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-04-02T03:32:08 +03:00",
        "valor": "$1,189.79",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-03-14T02:05:30 +03:00",
        "valor": "$2,818.85",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-09-12T08:23:12 +03:00",
        "valor": "$2,359.67",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-05-23T09:45:36 +03:00",
        "valor": "$1,041.52",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-11-19T03:47:24 +02:00",
        "valor": "$2,395.93",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-08-09T08:25:29 +03:00",
        "valor": "$2,547.51",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-02-06T12:40:42 +02:00",
        "valor": "$3,571.43",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-12-05T10:07:51 +02:00",
        "valor": "$2,606.22",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-04-19T06:55:00 +03:00",
        "valor": "$2,760.60",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-11-24T04:00:43 +02:00",
        "valor": "$3,917.73",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-10-15T03:51:54 +03:00",
        "valor": "$1,767.65",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-02-02T06:37:45 +02:00",
        "valor": "$2,984.06",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-02-08T06:16:33 +02:00",
        "valor": "$1,665.84",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-06-29T10:31:11 +03:00",
        "valor": "$1,742.41",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-02-24T05:32:34 +03:00",
        "valor": "$2,498.50",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-02-26T07:00:28 +03:00",
        "valor": "$2,932.85",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-11-12T01:59:12 +02:00",
        "valor": "$2,862.14",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-11-10T02:40:58 +02:00",
        "valor": "$2,281.87",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-10-18T11:45:39 +03:00",
        "valor": "$1,387.34",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-05-05T07:41:14 +03:00",
        "valor": "$3,084.27",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-03-27T07:17:56 +03:00",
        "valor": "$1,086.47",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-08-08T04:00:56 +03:00",
        "valor": "$3,633.71",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-11-14T01:58:39 +02:00",
        "valor": "$2,512.31",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-10-26T09:02:31 +02:00",
        "valor": "$1,279.63",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-01-21T11:52:27 +02:00",
        "valor": "$2,572.49",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-10-28T11:58:08 +02:00",
        "valor": "$1,979.14",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-03-03T08:38:04 +03:00",
        "valor": "$1,054.77",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-05-14T12:29:46 +03:00",
        "valor": "$2,202.44",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-01-11T08:35:26 +02:00",
        "valor": "$3,197.19",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-04-14T04:42:45 +03:00",
        "valor": "$1,308.41",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-05-04T03:40:39 +03:00",
        "valor": "$2,611.67",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-02-04T01:08:10 +02:00",
        "valor": "$2,652.40",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-03-29T05:13:39 +03:00",
        "valor": "$1,019.06",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2015-07-03T11:33:50 +03:00",
        "valor": "$3,604.56",
        "status": "REJEITADA"
    },
    {
        "emissao": "2014-04-14T04:57:34 +03:00",
        "valor": "$1,166.68",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-08-10T08:04:55 +03:00",
        "valor": "$1,747.86",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-07-08T11:25:47 +03:00",
        "valor": "$1,986.12",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-05-11T11:02:48 +03:00",
        "valor": "$2,235.61",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-01-07T09:39:44 +02:00",
        "valor": "$2,379.14",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-04-25T08:43:16 +03:00",
        "valor": "$1,870.21",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-05-26T06:49:37 +03:00",
        "valor": "$1,300.00",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-01-17T03:58:50 +02:00",
        "valor": "$2,144.78",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2014-01-02T10:00:28 +02:00",
        "valor": "$2,943.63",
        "status": "REJEITADA"
    },
    {
        "emissao": "2015-01-26T01:21:15 +02:00",
        "valor": "$3,322.20",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-03-07T07:17:28 +03:00",
        "valor": "$1,401.12",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2016-02-23T08:15:01 +03:00",
        "valor": "$3,026.61",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-04-24T07:49:23 +03:00",
        "valor": "$2,384.89",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2014-09-15T11:16:13 +03:00",
        "valor": "$3,388.94",
        "status": "MANIFESTADA"
    },
    {
        "emissao": "2016-03-26T06:01:35 +03:00",
        "valor": "$2,976.61",
        "status": "REJEITADA"
    },
    {
        "emissao": "2016-05-06T09:10:12 +03:00",
        "valor": "$3,911.52",
        "status": "RECONHECIDA"
    },
    {
        "emissao": "2015-04-07T05:51:00 +03:00",
        "valor": "$1,509.05",
        "status": "RECONHECIDA"
    }
];
// app.controller('ngTableCtrl', ["$scope", "ngTableParams", function ($scope, ngTableParams) {
//     $scope.tableParams = new ngTableParams({
//         page: 1, // show first page
//         count: 5 // count per page
//     }, {
//         total: data.length, // length of data
//         getData: function ($defer, params) {
//             $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//         }
//     });
// }]);
app.controller('ngTableCtrl2', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
    $scope.docs = {};
    $scope.docs.cols = [
        { field: "cce", name: "CCe", sortable: "cce", filter: { name: "text"}, show: true },
        { field: "chave", name: "Chave de acesso", sortable: "chave", filter: { name: "text"}, show: true },
        { field: "numero", name: "Número", sortable: "numero", filter: { name: "number"}, show: true },
        { field: "empresa", name: "Empresa", sortable: "empresa", filter: { name: "text"}, show: true },
        { field: "cnpj", name: "CNPJ", sortable: "cnpj", filter: { name: "text"}, show: true },
        { field: "ie", name: "IE", sortable: "ie", filter: { name: "text"}, show: true },
        { field: "emissao", name: "Emissão", sortable: "emissao", filter: { name: "text"}, show: true },
        { field: "tipo", name: "Tipo", sortable: "tipo", filter: { name: "text"}, show: true },
        { field: "valor", name: "Valor", sortable: "valor", filter: { name: "number"}, show: true },
        { field: "situacao", name: "Situação", sortable: "situacao", filter: { name: "text"}, show: true },
        { field: "modelo", name: "Modelo", sortable: "modelo", filter: { name: "number"}, show: true },
        { field: "manifestacao", name: "Manifestação", sortable: "manifestacao", filter: { name: "text"}, show: true },
        { field: "competencia", name: "Competência", sortable: "competencia", filter: { name: "text"}, show: true },
        { field: "nsu", name: "NSU", sortable: "nsu", filter: { name: "number"}, show: true },
        { field: "dataCriacao", name: "Data de criação", sortable: "dataCriacao", filter: { name: "text"}, show: true },
        { field: "origem", name: "Origem", sortable: "origem", filter: { name: "text"}, show: true },
        { field: "ufOrigem", name: "UF de origem", sortable: "ufOrigem", filter: { name: "text"}, show: true },
        { field: "ufDestino", name: "UF de destino", sortable: "ufDestino", filter: { name: "text"}, show: true },
        { field: "dataExportacao", name: "Data de exportação", sortable: "dataExportacao", filter: { name: "text"}, show: true },
        { field: "etiquetas", name: "Etiquetas", sortable: "etiqueta", filter: { name: "text"}, show: true }
    ];
    $scope.docs.count = 10; //default
    $scope.docs.sorting = {
        nsu: 'asc'
    };

    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: $scope.docs.count, // count per page
        sorting: $scope.docs.sorting
    }, {
        total: data.length,
        getData: function ($defer, params) {
            // use build-in angular filter
            var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
            $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
}]);
// app.controller('ngTableCtrl3', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
//     $scope.tableParams = new ngTableParams({
//         page: 1, // show first page
//         count: 5, // count per page
//         filter: {
//             name: 'M' // initial filter
//         }
//     }, {
//         total: data.length, // length of data
//         getData: function ($defer, params) {
//             // use build-in angular filter
//             var orderedData = params.filter() ? $filter('filter')(data, params.filter()) : data;
//             $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
//             params.total(orderedData.length);
//             // set total for recalc pagination
//             $defer.resolve($scope.users);
//         }
//     });
// }]);
// app.controller('ngTableCtrl4', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
//     $scope.tableParams = new ngTableParams({
//         page: 1, // show first page
//         count: 10 // count per page
//
//     }, {
//         total: data.length, // length of data
//         getData: function ($defer, params) {
//             // use build-in angular filter
//             var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
//             $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//
//         }
//     });
// }]);
// app.controller('ngTableCtrl5', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
//     $scope.tableParams = new ngTableParams({
//         page: 1, // show first page
//         count: 10 // count per page
//     }, {
//         total: data.length, // length of data
//         getData: function ($defer, params) {
//             // use build-in angular filter
//             var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
//
//             $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//         }
//     });
// }]);
// app.controller('ngTableCtrl6', ["$scope", "$filter", "ngTableParams", function ($scope, $filter, ngTableParams) {
//     var data = [{
//         "id": 1,
//         "lm": 138661285100,
//         "ln": "Smith",
//         "fn": "John",
//         "dc": "CEO",
//         "em": "j.smith@company.com",
//         "ph": "617-321-4567",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 2,
//         "lm": 138661285200,
//         "ln": "Taylor",
//         "fn": "Lisa",
//         "dc": "VP of Marketing",
//         "em": "l.taylor@company.com",
//         "ph": "617-522-5588",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 3,
//         "lm": 138661285300,
//         "ln": "Jones",
//         "fn": "James",
//         "dc": "VP of Sales",
//         "em": "j.jones@company.com",
//         "ph": "617-589-9977",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 4,
//         "lm": 138661285400,
//         "ln": "Wong",
//         "fn": "Paul",
//         "dc": "VP of Engineering",
//         "em": "p.wong@company.com",
//         "ph": "617-245-9785",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 5,
//         "lm": 138661285500,
//         "ln": "King",
//         "fn": "Alice",
//         "dc": "Architect",
//         "em": "a.king@company.com",
//         "ph": "617-244-1177",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 6,
//         "lm": 138661285600,
//         "ln": "Brown",
//         "fn": "Jan",
//         "dc": "Software Engineer",
//         "em": "j.brown@company.com",
//         "ph": "617-568-9863",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 7,
//         "lm": 138661285700,
//         "ln": "Garcia",
//         "fn": "Ami",
//         "dc": "Software Engineer",
//         "em": "a.garcia@company.com",
//         "ph": "617-327-9966",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 8,
//         "lm": 138661285800,
//         "ln": "Green",
//         "fn": "Jack",
//         "dc": "Software Engineer",
//         "em": "j.green@company.com",
//         "ph": "617-565-9966",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 9,
//         "lm": 138661285900,
//         "ln": "Liesen",
//         "fn": "Abraham",
//         "dc": "Plumber",
//         "em": "a.liesen@company.com",
//         "ph": "617-523-4468",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 10,
//         "lm": 138661286000,
//         "ln": "Bower",
//         "fn": "Angela",
//         "dc": "Product Manager",
//         "em": "a.bower@company.com",
//         "ph": "617-877-3434",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 11,
//         "lm": 138661286100,
//         "ln": "Davidoff",
//         "fn": "Fjodor",
//         "dc": "Database Admin",
//         "em": "f.davidoff@company.com",
//         "ph": "617-446-9999",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 12,
//         "lm": 138661286200,
//         "ln": "Vitrovic",
//         "fn": "Biljana",
//         "dc": "Director of Communications",
//         "em": "b.vitrovic@company.com",
//         "ph": "617-111-1111",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 13,
//         "lm": 138661286300,
//         "ln": "Valet",
//         "fn": "Guillaume",
//         "dc": "Software Engineer",
//         "em": "g.valet@company.com",
//         "ph": "617-565-4412",
//         "ac": true,
//         "dl": false
//     }, {
//         "id": 14,
//         "lm": 138661286400,
//         "ln": "Tran",
//         "fn": "Min",
//         "dc": "Gui Designer",
//         "em": "m.tran@company.com",
//         "ph": "617-866-2554",
//         "ac": true,
//         "dl": false
//     }];
//     $scope.tableParams = new ngTableParams({
//         page: 1,
//         count: 10
//     }, {
//         total: data.length,
//         getData: function ($defer, params) {
//             var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
//             $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
//         }
//     });
//
//     $scope.editId = -1;
//
//     $scope.setEditId = function (pid) {
//         $scope.editId = pid;
//     };
// }]);
