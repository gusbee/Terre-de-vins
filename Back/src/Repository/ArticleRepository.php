<?php

namespace App\Repository;

use App\Entity\Article;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @method Article|null find($id, $lockMode = null, $lockVersion = null)
 * @method Article|null findOneBy(array $criteria, array $orderBy = null)
 * @method Article[]    findAll()
 * @method Article[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ArticleRepository extends ServiceEntityRepository
{
    /** @var EntityManagerInterface  */
    private $entityManager;

    public function __construct(ManagerRegistry $registry,EntityManagerInterface $entityManager)
    {
        parent::__construct($registry, Article::class);
        $this->entityManager = $entityManager;
    }

    /**
     * @param $value
     * @return bool
     *
     * Description :
     * Récupère tous les articles par leurs id et return true si l'article n'existe pas
     */
    public function findArticleByTitle($value){

        $doctrine = $this->entityManager;

        /**  Récupére les articles par leur titre */
        $article = $doctrine
            ->getRepository(Article::class)
            ->findOneBy(['title' => $value]);

        /** si l'article n'existe pas, retourne faux sinon vrai*/
        if (is_null($article)) {
            return False;
        }
        else{
            return True;
        }
    }
}
