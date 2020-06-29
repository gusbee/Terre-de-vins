<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200520093726 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE degustation (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, link VARCHAR(255) NOT NULL, comments VARCHAR(255) NOT NULL, pub_date DATETIME NOT NULL, creator VARCHAR(255) NOT NULL, guid VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, content LONGTEXT NOT NULL, comment_rss VARCHAR(255) NOT NULL, comments_slash VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE degustation_category (degustation_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_CBA8FF46469EB1CD (degustation_id), INDEX IDX_CBA8FF4612469DE2 (category_id), PRIMARY KEY(degustation_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE degustation_category ADD CONSTRAINT FK_CBA8FF46469EB1CD FOREIGN KEY (degustation_id) REFERENCES degustation (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE degustation_category ADD CONSTRAINT FK_CBA8FF4612469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE evenement CHANGE city city VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE degustation_category DROP FOREIGN KEY FK_CBA8FF46469EB1CD');
        $this->addSql('DROP TABLE degustation');
        $this->addSql('DROP TABLE degustation_category');
        $this->addSql('ALTER TABLE evenement CHANGE city city VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
    }
}
