using Duende.IdentityServer.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ShopHeaven.Data.Models;
using ShopHeaven.Data.Models.Common;
using System.Linq.Expressions;

namespace ShopHeaven.Data
{
    public class ShopDbContext : ApiAuthorizationDbContext<User>
    {
        public ShopDbContext(DbContextOptions options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions)
        {

        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Specification> Specifications { get; set; }

        public DbSet<MainCategory> MainCategories { get; set; }

        public DbSet<SubCategory> SubCategories { get; set; }

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

        public DbSet<ShippingMethod> ShippingMethods { get; set; }

        public DbSet<Label> Labels { get; set; }

        public DbSet<Currency> Currencies { get; set; }

        public DbSet<ProductLabel> ProductsLabels { get; set; }

        public DbSet<ProductImage> ProductsImages { get; set; }

        public DbSet<PaymentSession> PaymentSessions { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductTag>()
                .HasKey(pt => new { pt.TagId, pt.ProductId });
            modelBuilder.Entity<ProductTag>()
                .HasOne(x => x.Tag)
                .WithMany(x => x.Products)
                .HasForeignKey(pt => pt.TagId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProductTag>()
               .HasOne(x => x.Product)
               .WithMany(x => x.Tags)
               .HasForeignKey(pt => pt.ProductId)
               .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductCart>()
                .HasKey(pc => new { pc.CartId, pc.ProductId });
            modelBuilder.Entity<ProductCart>()
                .HasOne(x => x.Cart)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.CartId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProductCart>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Carts)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductWishlist>()
               .HasKey(x => new { x.WishlistId, x.ProductId });
            modelBuilder.Entity<ProductWishlist>()
                .HasOne(x => x.Wishlist)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.WishlistId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProductWishlist>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Wishlists)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductOrder>()
             .HasKey(x => new { x.OrderId, x.ProductId });
            modelBuilder.Entity<ProductOrder>()
                .HasOne(x => x.Order)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.OrderId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProductOrder>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductLabel>()
            .HasKey(x => new { x.LabelId, x.ProductId });
            modelBuilder.Entity<ProductLabel>()
                .HasOne(x => x.Label)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.LabelId)
                .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<ProductLabel>()
                .HasOne(x => x.Product)
                .WithMany(x => x.Labels)
                .HasForeignKey(x => x.ProductId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SubCategory>()
                .HasOne(x => x.MainCategory)
                .WithMany(x => x.SubCategories)
                .HasForeignKey(x => x.MainCategoryId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SubCategory>()
             .HasOne(x => x.Image)
             .WithMany(x => x.SubCategories)
             .HasForeignKey(x => x.ImageId)
             .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<MainCategory>()
              .HasOne(x => x.Image)
              .WithMany(x => x.Categories)
              .HasForeignKey(x => x.ImageId)
              .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductImage>()
           .HasKey(x => new { x.ProductId, x.ImageId });

            modelBuilder.Entity<ProductImage>()
             .HasOne(x => x.Product)
             .WithMany(x => x.Images)
             .HasForeignKey(x => x.ProductId)
             .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ProductImage>()
           .HasOne(x => x.Image)
           .WithMany(x => x.Products)
           .HasForeignKey(x => x.ImageId)
           .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Product>()
            .HasOne(x => x.CreatedBy)
            .WithMany(x => x.Products)
            .HasForeignKey(x => x.CreatedById)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Product>()
            .HasMany(x => x.Reviews)
            .WithOne(x => x.Product)
            .HasForeignKey(x => x.ProductId)
            .OnDelete(DeleteBehavior.NoAction);

            modelBuilder
            .Entity<Product>()
            .Property(p => p.Rating)
            .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder
           .Entity<Cart>()
           .Property(c => c.TotalPriceWithDiscount)
           .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder
          .Entity<Cart>()
          .Property(c => c.TotalPriceWithNoDiscount)
          .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder
         .Entity<Order>()
         .Property(c => c.TotalPriceWithNoDiscount)
         .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder
         .Entity<Order>()
         .Property(c => c.TotalPriceWithDiscountAndCoupon)
         .UsePropertyAccessMode(PropertyAccessMode.Property);

            modelBuilder
          .Entity<Order>()
          .Property(c => c.TotalPriceWithDiscount)
          .UsePropertyAccessMode(PropertyAccessMode.Property);
        }
    }
}