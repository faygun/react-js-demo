// class ProductCategoryRow extends React.Component {
//     render() {
//       const category = this.props.category;
//       return (
//         <tr>
//           <th colSpan="2">
//             {category}
//           </th>
//         </tr>
//       );
//     }
//   }

//   class ProductRow extends React.Component {
//     render() {
//       const product = this.props.product;
//       const name = product.stocked ?
//         product.name :
//         <span style={{color: 'red'}}>
//           {product.name}
//         </span>;

//       return (
//         <tr>
//           <td>{name}</td>
//           <td>{product.price}</td>
//         </tr>
//       );
//     }
//   }

//   class ProductTable extends React.Component {
//     render() {
//       const rows = [];
//       let lastCategory = null;

//       this.props.products.forEach((product) => {
//         // if (product.category !== lastCategory) {
//         //   rows.push(
//         //     <ProductCategoryRow
//         //       category={product.category}
//         //       key={product.category} />
//         //   );
//         // }
//         rows.push(
//           <ProductRow
//             product={product}
//             key={product.name} />
//         );
//         lastCategory = product.category;
//       });

//       return (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Price</th>
//             </tr>
//           </thead>
//           <tbody>{rows}</tbody>
//         </table>
//       );
//     }
//   }

//   class SearchBar extends React.Component {
//     render() {
//       return (
//         <form>
//           <input type="text" placeholder="Search..." />
//           <p>
//             <input type="checkbox" />
//             {' '}
//             Only show products in stock
//           </p>
//         </form>
//       );
//     }
//   }

//   class FilterableProductTable extends React.Component {
//     render() {
//       return (
//         <div>
//           <SearchBar />
//           <ProductTable products={this.props.products} />
//         </div>
//       );
//     }
//   }


//   const PRODUCTS = [
//     {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//     {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//     {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//     {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//     {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//     {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
//   ];

//   ReactDOM.render(
//     <FilterableProductTable products={PRODUCTS} />,
//     document.getElementById('main')
//   );


// import React, {Component} from 'react';
class ProductRow extends React.Component{
    render(){
        const product = this.props.product
        return (
            <div data-id={product.id}>
                <span>{product.name}  {product.username}</span>
            </div>
        );
    }
}

class ProviderRow extends React.Component{
    render(){
        const provider = this.props.provider
        return (
            <div data-id={provider.id}>
                <span>{provider.name}  {provider.username}</span>
            </div>
        );
    }
}

class ButtonContainer extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            products:[],
            providers:[]
        };
    }

    GetProducts(){
        var that = this;
        that.state.providers = []
        fetch('http://localhost:2525/api/service?methodName=GetProducts',{
            method:'POST',
            mode:'CORS',
            body:null,
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(results => {
            return results.json();
        }).then(data =>{
            let products = data.data;
            that.setState({products:products});
            console.log("state", this.state.products);
        })
    }

    GetProviders(){
        var that = this;
        that.state.products = []
        fetch('http://localhost:2525/api/service?methodName=GetProviders',{
            method:'POST',
            mode:'CORS',
            body:null,
            headers:{
                'Content-Type':'application/json'
            }}
        )
        .then(results => {
            return results.json();
        }).then(data =>{
            let providers = data.data;
            that.setState({providers:providers});
            console.log("state", this.state.providers);
        })
    }

    render(){
        const rows=[];
        if(this.state.products){
            this.state.products.forEach(product => {
                rows.push(
                    <ProductRow product={product} />
                )
            });
        }

        const rowsProvider=[];
        if(this.state.providers){
            this.state.providers.forEach(provider => {
                rowsProvider.push(
                    <ProviderRow provider={provider} />
                )
            });
        }

        return(
            <div class="container">
                <button onClick={this.GetProducts.bind(this)}>GetProducts</button>
                <button onClick={this.GetProviders.bind(this)}>GetProviders</button>
                <div class="response">
                    {rows}
                    {rowsProvider}
                </div>
            </div>
        );
    }



}

// function ProductRow(props){
//     return(
//         <div style="border:1px solid red;" data-id={props.Id}><span>{props.Name}  {props.UserName}</span></div>
//     );
// }

ReactDOM.render(
    <ButtonContainer/>,
    document.getElementById("main")
);