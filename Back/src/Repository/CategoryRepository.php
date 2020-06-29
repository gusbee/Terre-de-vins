<?php

namespace App\Repository;

use App\Entity\Article;
use App\Entity\Category;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Category|null find($id, $lockMode = null, $lockVersion = null)
 * @method Category|null findOneBy(array $criteria, array $orderBy = null)
 * @method Category[]    findAll()
 * @method Category[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CategoryRepository extends ServiceEntityRepository
{
    private $entityManager;

    public function __construct(ManagerRegistry $registry,EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Category::class);
        $this->entityManager = $entityManager;
    }

    /**
     * @param $value
     * @return Category|object|null
     *
     * Description :
     * Récupère tous les categories par leurs titre et mets à jour celles qui n'éxiste pas
     */
    public function findCategoryByName($value)
    {

        $doctrine = $this->entityManager;

        /** Récupère tous les categories par leurs nom */
           $categoryUpdate = $doctrine
               ->getRepository(Category::class)
               ->findOneBy(['name' => $value]);

        /** Mets à jour les catégories qui n'existe pas */
        if(is_null($categoryUpdate)) {
            $category = new Category();
            $category->setName($value);

            /** persistance */
            $doctrine->persist($category);
            /** Insert */
            $doctrine->flush();
            return $category;
        }
    return $categoryUpdate;

    }
}
