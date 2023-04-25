using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductWithTypesAndBrandsSpecification()
        {
            AddIncude(x => x.ProductType);
            AddIncude(x => x.ProductBrand);
            
        }

        public ProductWithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
        {
             AddIncude(x => x.ProductType);
            AddIncude(x => x.ProductBrand);
        }
    }
}