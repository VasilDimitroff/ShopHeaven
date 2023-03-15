using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ShopHeaven.Data.Models;

namespace ShopHeaven.Data
{
    public class ShopDbContext : ApiAuthorizationDbContext<User>
    {
        public ShopDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Rating> Ratings { get; set; }

        public DbSet<MainCategory> MainCategories { get; set; }

        public DbSet<SubCategory> SubCategories { get; set; }

        public DbSet<ProductMainCategory> ProductsMainCategories { get; set; }

        public DbSet<ProductSubCategory> ProductsSubCategories { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductMainCategory>()
                .HasKey(pmc => new { pmc.ProductId, pmc.MainCategoryId });
            modelBuilder.Entity<ProductMainCategory>()
                .HasOne(pmc => pmc.Product)
                .WithMany(p => p.MainCategories)
                .HasForeignKey(pmc => pmc.ProductId);
            modelBuilder.Entity<ProductMainCategory>()
                .HasOne(pmc => pmc.MainCategory)
                .WithMany(mc => mc.Products)
                .HasForeignKey(pmc => pmc.MainCategoryId);

            modelBuilder.Entity<ProductSubCategory>()
                .HasKey(psc => new { psc.ProductId, psc.SubCategoryId });
            modelBuilder.Entity<ProductSubCategory>()
                .HasOne(psc => psc.Product)
                .WithMany(sc => sc.SubCategories)
                .HasForeignKey(psc => psc.ProductId);
            modelBuilder.Entity<ProductSubCategory>()
                .HasOne(psc => psc.SubCategory)
                .WithMany(sc => sc.Products)
                .HasForeignKey(psc => psc.SubCategoryId);

            modelBuilder.Entity<ProductTag>()
                .HasKey(pt => new { pt.TagId, pt.ProductId });
            modelBuilder.Entity<ProductTag>()
                .HasOne(x => x.Tag)
                .WithMany(x => x.Products)
                .HasForeignKey(pt => pt.TagId);
            modelBuilder.Entity<ProductTag>()
               .HasOne(x => x.Product)
               .WithMany(x => x.Tags)
               .HasForeignKey(pt => pt.ProductId);
        }
    }
}