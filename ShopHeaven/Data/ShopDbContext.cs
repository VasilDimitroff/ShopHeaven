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

        public DbSet<MainCategory> MainCategories { get; set; }

        public DbSet<SubCategory> SubCategories { get; set; }

        public DbSet<ProductMainCategory> ProductsMainCategories { get; set; }

        public DbSet<ProductSubCategory> ProductsSubCategories { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<ProductCart> ProductsCarts { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }

        public DbSet<ProductWishlist> ProductsWishlists { get; set; }

        public DbSet<Coupon> Coupons { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<ProductTag> ProductsTags { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<ProductOrder> ProductsOrders { get; set; }

        public DbSet<Payment> Payments { get; set; }



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

            modelBuilder.Entity<ProductCart>()
                .HasKey(pc => new { pc.CartId, pc.ProductId });
            modelBuilder.Entity<ProductCart>()
                .HasOne(x => x.Cart)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CartId);
            modelBuilder.Entity<ProductCart>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Carts)
                .HasForeignKey(x => x.ProductId);

            modelBuilder.Entity<ProductWishlist>()
               .HasKey(x => new { x.WishlistId, x.ProductId });
            modelBuilder.Entity<ProductWishlist>()
                .HasOne(x => x.Wishlist)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.WishlistId);
            modelBuilder.Entity<ProductWishlist>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Wishlists)
                .HasForeignKey(x => x.ProductId);

            modelBuilder.Entity<ProductOrder>()
             .HasKey(x => new { x.OrderId, x.ProductId });
            modelBuilder.Entity<ProductOrder>()
                .HasOne(x => x.Order)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.OrderId);
            modelBuilder.Entity<ProductOrder>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.ProductId);
        }
    }
}